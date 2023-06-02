import getConfig from 'next/config';
import { AutoComplete } from 'primereact/autocomplete';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';
import { Editor } from 'primereact/editor';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { TaskContext } from './context/taskcontext';

function CreateTask() {
    const [task, setTask] = useState({});
    const [filteredMembers, setFilteredMembers] = useState([]);
    const toast = useRef(null);
    const contextPath = getConfig().publicRuntimeConfig.contextPath;
    const { addTask, editTask, closeDialog, dialogConfig, selectedTask, members } = useContext(TaskContext);

    const filterMembers = (event) => {
        let filtered = [];
        let query = event.query;

        for (let i = 0; i < members.length; i++) {
            let member = members[i];
            if (member.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(member);
            }
        }
        setFilteredMembers(filtered);
    };

    const onMemberChange = (e) => {
        setTask((prevState) => ({ ...prevState, members: [...e.value] }));
    };
    const save = () => {
        if (dialogConfig.newTask) {
            toast.current.show({ severity: 'success', summary: 'Success', detail: `Task "${selectedTask.name}" created successfully.` });
            addTask(task);
        } else {
            toast.current.show({ severity: 'success', summary: 'Edited', detail: `Task "${selectedTask.name}" edited successfully.` });
            editTask(task);
        }
        closeDialog();
    };

    const resetTask = () => {
        const taskId = Math.floor(Math.random() * 1000).toString();
        setTask({ id: taskId, name: '', description: '', status: 'Waiting' });
    };

    const itemTemplate = (member) => {
        return (
            <div className="flex align-items-center border-round">
                <img src={`${contextPath}/demo/images/avatar/${member.image}`} alt={member.name} className="h-2rem w-2rem mr-2" />
                <span className="text-900 font-medium">{member.name}</span>
            </div>
        );
    };
    const selectedItemTemplate = (member) => {
        return (
            <div className="flex align-items-center">
                <img src={`${contextPath}/demo/images/avatar/${member.image}`} alt={member.name} className="h-2rem w-2rem mr-2" />
                <span className="text-900 font-medium">{member.name}</span>
            </div>
        );
    };

    useEffect(() => {
        if (dialogConfig.newTask) {
            resetTask();
        }
        if (dialogConfig.newTask === false) setTask(selectedTask);
    }, [dialogConfig]);

    return (
        <React.Fragment>
            <Toast ref={toast} key="Task Toast"></Toast>
            <Dialog header={dialogConfig.header || ''} visible={dialogConfig.visible} modal dismissableMask className="mx-3 sm:mx-0 sm:w-full md:w-8 lg:w-6" contentClassName="border-round-bottom border-top-1 surface-border p-0" onHide={closeDialog}>
                <div className="p-4">
                    <div className="grid p-fluid formgrid">
                        <div className="col-12 field">
                            <label htmlFor="name" className="text-900 font-semibold">
                                Task Name
                            </label>
                            <InputText id="name" type="text" placeholder="Title" value={task.name} onChange={(e) => setTask((prevState) => ({ ...prevState, name: e.target.value }))} />
                        </div>
                        <div className="col-12 field">
                            <label htmlFor="description" className="text-900 font-semibold">
                                Description
                            </label>
                            <Editor value={task.description} onChange={(e) => setTask((prevState) => ({ ...prevState, description: e.target.value }))} style={{ height: '150px' }}></Editor>
                        </div>
                        <div className="col-6 field mt-0">
                            <label htmlFor="start" className="text-900 font-semibold">
                                Start Date
                            </label>
                            <Calendar dateFormat="yy-mm-dd" showTime={false} inputId="start" placeholder="Start Date" value={task.startDate} onChange={(e) => setTask((prevState) => ({ ...prevState, startDate: e.value }))}></Calendar>
                        </div>
                        <div className="col-6 field mt-0">
                            <label htmlFor="end" className="text-900 font-semibold">
                                Due Date
                            </label>
                            <Calendar dateFormat="yy-mm-dd" showTime={false} inputId="end" placeholder="End Date" value={task.endDate} onChange={(e) => setTask((prevState) => ({ ...prevState, endDate: e.value }))}></Calendar>
                        </div>
                        <div className="col-12 field">
                            <label htmlFor="members" className="text-900 font-semibold">
                                Add Team Member
                            </label>
                            <AutoComplete
                                itemTemplate={itemTemplate}
                                selectedItemTemplate={selectedItemTemplate}
                                inputId="members"
                                id="autocomplete"
                                value={task.members}
                                onChange={onMemberChange}
                                placeholder="Choose team members"
                                suggestions={filteredMembers}
                                completeMethod={filterMembers}
                                field="name"
                                multiple
                                aria-label="Members"
                                dropdownAriaLabel="Members"
                                inputStyle={{ height: '2.5rem' }}
                            />
                        </div>
                        <div className="col-12 flex justify-content-end mt-4">
                            <Button className="p-button-outlined w-8rem mr-3" icon="pi pi-times" label="Cancel" onClick={() => resetTask()}></Button>
                            <Button className="p-button-primary w-8rem" icon="pi pi-check" label="Save" onClick={() => save()}></Button>
                        </div>
                    </div>
                </div>
            </Dialog>
        </React.Fragment>
    );
}

export default CreateTask;
