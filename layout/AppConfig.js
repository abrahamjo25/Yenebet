import PrimeReact from 'primereact/api';
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';
import { RadioButton } from 'primereact/radiobutton';
import { Sidebar } from 'primereact/sidebar';
import { classNames } from 'primereact/utils';
import { useContext, useEffect } from 'react';
import { LayoutContext } from './context/layoutcontext';

const AppConfig = (props) => {
    const { layoutConfig, setLayoutConfig, layoutState, setLayoutState, isSlim, isHorizontal } = useContext(LayoutContext);
    const scales = [12, 13, 14, 15, 16];
    const componentThemes = [
        { name: 'indigo', color: '#6366F1' },
        { name: 'blue', color: '#3B82F6' },
        { name: 'purple', color: '#8B5CF6' },
        { name: 'teal', color: '#14B8A6' },
        { name: 'cyan', color: '#06b6d4' },
        { name: 'green', color: '#10b981' },
        { name: 'orange', color: '#f59e0b' },
        { name: 'pink', color: '#d946ef' }
    ];

    useEffect(() => {
        if (isSlim() || isHorizontal()) {
            setLayoutState((prevState) => ({ ...prevState, resetMenu: true }));
        }
    }, [layoutConfig.menuMode]);

    const onConfigButtonClick = () => {
        setLayoutState((prevState) => ({ ...prevState, configSidebarVisible: true }));
    };

    const onConfigSidebarHide = () => {
        setLayoutState((prevState) => ({ ...prevState, configSidebarVisible: false }));
    };

    const changeInputStyle = (e) => {
        setLayoutConfig((prevState) => ({ ...prevState, inputStyle: e.value }));
    };

    const changeRipple = (e) => {
        PrimeReact.ripple = e.value;
        setLayoutConfig((prevState) => ({ ...prevState, ripple: e.value }));
    };

    const changeMenuMode = (e) => {
        setLayoutConfig((prevState) => ({ ...prevState, menuMode: e.value }));
    };

    const changeMenuTheme = (e) => {
        setLayoutConfig((prevState) => ({ ...prevState, menuTheme: e.value }));
    };

    const changeColorScheme = (colorScheme) => {
        const themeLink = document.getElementById('theme-link');
        const themeLinkHref = themeLink.getAttribute('href');
        const currentColorScheme = 'theme-' + layoutConfig.colorScheme.toString();
        const newColorScheme = 'theme-' + colorScheme;
        const newHref = themeLinkHref.replace(currentColorScheme, newColorScheme);

        replaceLink(themeLink, newHref, () => {
            setLayoutConfig((prevState) => ({ ...prevState, colorScheme }));
        });
    };

    const changeTheme = (theme) => {
        const themeLink = document.getElementById('theme-link');
        const themeHref = themeLink.getAttribute('href');
        const newHref = themeHref.replace(layoutConfig.theme, theme);
        replaceLink(themeLink, newHref, () => {
            setLayoutConfig((prevState) => ({ ...prevState, theme }));
        });
    };

    const replaceLink = (linkElement, href, onComplete) => {
        if (!linkElement || !href) {
            return;
        }

        const id = linkElement.getAttribute('id');
        const cloneLinkElement = linkElement.cloneNode(true);

        cloneLinkElement.setAttribute('href', href);
        cloneLinkElement.setAttribute('id', id + '-clone');

        linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

        cloneLinkElement.addEventListener('load', () => {
            linkElement.remove();

            const element = document.getElementById(id); // re-check
            element && element.remove();

            cloneLinkElement.setAttribute('id', id);
            onComplete && onComplete();
        });
    };

    const decrementScale = () => {
        setLayoutConfig((prevState) => ({ ...prevState, scale: prevState.scale - 1 }));
    };

    const incrementScale = () => {
        setLayoutConfig((prevState) => ({ ...prevState, scale: prevState.scale + 1 }));
    };

    const applyScale = () => {
        document.documentElement.style.fontSize = layoutConfig.scale + 'px';
    };

    useEffect(() => {
        applyScale();
    }, [layoutConfig.scale]);

    return (
        <>
            <button className="layout-config-button p-link" type="button" onClick={onConfigButtonClick}>
                <i className="pi pi-cog"></i>
            </button>

            <Sidebar visible={layoutState.configSidebarVisible} onHide={onConfigSidebarHide} position="right" className="layout-config-sidebar w-18rem">
                <h5>Themes</h5>
                <div className="flex flex-wrap row-gap-3">
                    {componentThemes.map((theme, i) => {
                        return (
                            <div key={i} className="w-3">
                                <Button
                                    autoFocus={layoutConfig.theme === theme.name}
                                    type="button"
                                    className="cursor-pointer p-link w-2rem h-2rem border-circle flex-shrink-0"
                                    onClick={() => changeTheme(theme.name)}
                                    style={{ backgroundColor: theme.color }}
                                ></Button>
                            </div>
                        );
                    })}
                </div>

                <h5>Scale</h5>
                <div className="flex align-items-center">
                    <Button icon="pi pi-minus" type="button" onClick={decrementScale} className="p-button-text p-button-rounded w-2rem h-2rem mr-2" disabled={layoutConfig.scale === scales[0]}></Button>
                    <div className="flex gap-2 align-items-center">
                        {scales.map((s, i) => {
                            return <i key={i} className={classNames('pi pi-circle-fill text-300', { 'text-primary-500': s === layoutConfig.scale })}></i>;
                        })}
                    </div>
                    <Button icon="pi pi-plus" type="button" onClick={incrementScale} className="p-button-text p-button-rounded w-2rem h-2rem ml-2" disabled={layoutConfig.scale === scales[scales.length - 1]}></Button>
                </div>

                {!props.minimal && (
                    <>
                        <h5>Menu Type</h5>
                        <div className="field-radiobutton">
                            <RadioButton name="menuMode" value={'static'} checked={layoutConfig.menuMode === 'static'} onChange={(e) => changeMenuMode(e)} inputId="mode1"></RadioButton>
                            <label htmlFor="mode1">Static</label>
                        </div>
                        <div className="field-radiobutton">
                            <RadioButton name="menuMode" value={'overlay'} checked={layoutConfig.menuMode === 'overlay'} onChange={(e) => changeMenuMode(e)} inputId="mode2"></RadioButton>
                            <label htmlFor="mode2">Overlay</label>
                        </div>
                        <div className="field-radiobutton">
                            <RadioButton name="menuMode" value={'slim'} checked={layoutConfig.menuMode === 'slim'} onChange={(e) => changeMenuMode(e)} inputId="mode3"></RadioButton>
                            <label htmlFor="mode3">Slim</label>
                        </div>
                        <div className="field-radiobutton">
                            <RadioButton name="menuMode" value={'horizontal'} checked={layoutConfig.menuMode === 'horizontal'} onChange={(e) => changeMenuMode(e)} inputId="mode4"></RadioButton>
                            <label htmlFor="mode4">Horizontal</label>
                        </div>

                        <h5>Menu Theme</h5>
                        <div className="field-radiobutton">
                            <RadioButton name="menuTheme" value="colorScheme" checked={layoutConfig.menuTheme === 'colorScheme'} onChange={(e) => changeMenuTheme(e)} inputId="menutheme-colorscheme"></RadioButton>
                            <label htmlFor="menutheme-colorscheme">Color Scheme</label>
                        </div>
                        <div className="field-radiobutton">
                            <RadioButton name="menuTheme" value="primaryColor" checked={layoutConfig.menuTheme === 'primaryColor'} onChange={(e) => changeMenuTheme(e)} inputId="menutheme-primarycolor"></RadioButton>
                            <label htmlFor="menutheme-primarycolor">Primary Color</label>
                        </div>
                        <div className="field-radiobutton">
                            <RadioButton name="menuTheme" value="transparent" checked={layoutConfig.menuTheme === 'transparent'} onChange={(e) => changeMenuTheme(e)} inputId="menutheme-transparent"></RadioButton>
                            <label htmlFor="menutheme-transparent">Transparent</label>
                        </div>
                    </>
                )}

                <h5>Color Scheme</h5>
                <div className="field-radiobutton">
                    <RadioButton name="colorScheme" value="light" checked={layoutConfig.colorScheme === 'light'} onChange={(e) => changeColorScheme(e.value)} inputId="mode-light"></RadioButton>
                    <label htmlFor="mode-light">Light</label>
                </div>
                <div className="field-radiobutton">
                    <RadioButton name="colorScheme" value="dim" checked={layoutConfig.colorScheme === 'dim'} onChange={(e) => changeColorScheme(e.value)} inputId="mode-dim"></RadioButton>
                    <label htmlFor="mode-dim">Dim</label>
                </div>
                <div className="field-radiobutton">
                    <RadioButton name="colorScheme" value="dark" checked={layoutConfig.colorScheme === 'dark'} onChange={(e) => changeColorScheme(e.value)} inputId="mode-dark"></RadioButton>
                    <label htmlFor="mode-dark">Dark</label>
                </div>

                {!props.minimal && (
                    <>
                        <h5>Input Style</h5>
                        <div className="flex">
                            <div className="field-radiobutton flex-1">
                                <RadioButton name="inputStyle" value="outlined" checked={layoutConfig.inputStyle === 'outlined'} onChange={(e) => changeInputStyle(e)} inputId="outlined_input"></RadioButton>
                                <label htmlFor="outlined_input">Outlined</label>
                            </div>
                            <div className="field-radiobutton flex-1">
                                <RadioButton name="inputStyle" value="filled" checked={layoutConfig.inputStyle === 'filled'} onChange={(e) => changeInputStyle(e)} inputId="filled_input"></RadioButton>
                                <label htmlFor="filled_input">Filled</label>
                            </div>
                        </div>

                        <h5>Ripple Effect</h5>
                        <InputSwitch checked={layoutConfig.ripple} onChange={(e) => changeRipple(e)}></InputSwitch>
                    </>
                )}
            </Sidebar>
        </>
    );
};

export default AppConfig;
