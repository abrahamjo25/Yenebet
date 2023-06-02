import React, { useContext, useEffect, useRef, useState } from 'react';
import getConfig from 'next/config';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Knob } from 'primereact/knob';
import { Rating } from 'primereact/rating';
import { ProductService } from '../../demo/service/ProductService';
import { LayoutContext } from '../../layout/context/layoutcontext';
import { Tooltip } from 'primereact/tooltip';

export default function ECommerce() {
    const [products, setProducts] = useState([]);
    const [chartOptions, setChartOptions] = useState({});
    const [weeks] = useState([
        {
            label: 'Last Week',
            value: 0,
            data: [
                [65, 59, 80, 81, 56, 55, 40],
                [28, 48, 40, 19, 86, 27, 90]
            ]
        },
        {
            label: 'This Week',
            value: 1,
            data: [
                [35, 19, 40, 61, 16, 55, 30],
                [48, 78, 10, 29, 76, 77, 10]
            ]
        }
    ]);
    const [chartData, setChartData] = useState({});
    const [selectedWeek, setSelectedWeek] = useState(0);
    const [filters, setFilters] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const { layoutConfig } = useContext(LayoutContext);
    const contextPath = getConfig().publicRuntimeConfig.contextPath;
    const dt = useRef(null);
    const knobValue = 90;

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const onWeekChange = (e) => {
        let newBarData = { ...chartData.barData };
        newBarData.datasets[0].data[0] = weeks[e.value].data[0];
        newBarData.datasets[1].data[1] = weeks[e.value].data[1];
        setSelectedWeek(e.value);
        setChartData((prevState) => ({ ...prevState, barData: newBarData }));
    };
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const initFilters = () => {
        setFilters({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            representative: { value: null, matchMode: FilterMatchMode.IN },
            date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
            balance: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
            verified: { value: null, matchMode: FilterMatchMode.EQUALS }
        });
        setGlobalFilterValue('');
    };

    const nameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.name}
            </>
        );
    };

    const priceBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Price</span>
                {formatCurrency(rowData.price)}
            </>
        );
    };

    const categoryBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Category</span>
                {rowData.category}
            </>
        );
    };

    const statusBodyTemplate = (rowData) => {
        const badgeClass = rowData.inventoryStatus.toLowerCase();
        return (
            <>
                <span className="p-column-title">Status</span>
                <span className={'product-badge status-' + badgeClass}>{rowData.inventoryStatus}</span>
            </>
        );
    };

    const searchBodyTemplate = () => {
        return (
            <>
                <Button type="button" icon="pi pi-search" className="p-button-outlined p-button-rounded"></Button>
            </>
        );
    };

    useEffect(() => {
        const productService = new ProductService();
        productService.getProductsSmall().then((data) => setProducts(data));
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const pieData = {
            labels: ['Clients', 'Services'],
            datasets: [
                {
                    data: [300, 50],
                    backgroundColor: [documentStyle.getPropertyValue('--primary-700'), documentStyle.getPropertyValue('--primary-400'), documentStyle.getPropertyValue('--primary-100')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--primary-600'), documentStyle.getPropertyValue('--primary-300'), documentStyle.getPropertyValue('--primary-200')]
                }
            ]
        };

        const pieOptions = {
            animation: {
                duration: 0
            },
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                        usePointStyle: true,
                        font: {
                            weight: 700
                        },
                        padding: 28
                    },
                    position: 'bottom'
                }
            }
        };

        const barData = {
            labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
            datasets: [
                {
                    label: 'API Claim',
                    backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                    barThickness: 12,
                    borderRadius: 12,
                    data: weeks[selectedWeek].data[0]
                },
                {
                    label: 'Client Claim',
                    backgroundColor: documentStyle.getPropertyValue('--primary-200'),
                    barThickness: 12,
                    borderRadius: 12,
                    data: weeks[selectedWeek].data[1]
                }
            ]
        };

        const barOptions = {
            animation: {
                duration: 0
            },
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                        usePointStyle: true,
                        font: {
                            weight: 700
                        },
                        padding: 28
                    },
                    position: 'bottom'
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
        setChartOptions({
            barOptions,
            pieOptions
        });
        setChartData({
            barData,
            pieData
        });
        initFilters();
    }, [selectedWeek, layoutConfig]);

    return (
        <div className="grid">
            <div className="col-12 md:col-6 xl:col-3">
                <div className="card h-full">
                    <span className="font-semibold text-lg">USERS</span>
                    <div className="flex justify-content-between align-items-start mt-3">
                        <div className="w-6">
                            <span className="text-4xl font-bold text-900">120</span>
                        </div>
                        <div className="w-6"></div>
                    </div>
                </div>
            </div>
            <div className="col-12 md:col-6 xl:col-3">
                <div className="card h-full">
                    <span className="font-semibold text-lg">CLIENTS</span>
                    <div className="flex justify-content-between align-items-start mt-3">
                        <div className="w-6">
                            <span className="text-4xl font-bold text-900">4500</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 md:col-6 xl:col-3">
                <div className="card h-full">
                    <span className="font-semibold text-lg">SERVICES</span>
                    <div className="flex justify-content-between align-items-start mt-3">
                        <div className="w-6">
                            <span className="text-4xl font-bold text-900">360</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 md:col-6 xl:col-3">
                <div className="card h-full">
                    <span className="font-semibold text-lg">ROLES</span>
                    <div className="flex justify-content-between align-items-start mt-3">
                        <div className="w-6">
                            <span className="text-4xl font-bold text-900">164</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12 xl:col-9">
                <div className="card h-auto">
                    <div className="flex align-items-start justify-content-between mb-6">
                        <span className="text-900 text-xl font-semibold">Claim Overview</span>
                        <Dropdown options={weeks} value={selectedWeek} className="w-10rem" optionLabel="label" onChange={onWeekChange}></Dropdown>
                    </div>
                    <Chart height="300px" type="bar" data={chartData.barData} options={chartOptions.barOptions}></Chart>
                </div>
            </div>
            <div className="col-12 xl:col-3">
                <div className="card h-auto">
                    <div className="text-900 text-xl font-semibold mb-6"> By Category</div>
                    <Chart height="300px" type="pie" data={chartData.pieData} options={chartOptions.pieOptions}></Chart>
                </div>
            </div>
        </div>
    );
}
