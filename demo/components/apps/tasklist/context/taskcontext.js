import React, { useState, useEffect } from 'react';
import getConfig from 'next/config';

export const TaskContext = React.createContext();

export const TaskProvider = (props) => {
    const [tasks, setTasks] = useState([]);
    const [members, setMembers] = useState([]);
    const [selectedTask, setSelectedTask] = useState({});
    const [dialogConfig, setDialogConfig] = useState({
        visible: false,
        header: '',
        newTask: false
    });

    const contextPath = getConfig().publicRuntimeConfig.contextPath;

    const getTasks = () => {
        return fetch(contextPath + '/demo/data/tasks.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data);
    };

    const getMembers = () => {
        return fetch(contextPath + '/demo/data/members.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data);
    };

    useEffect(() => {
        getTasks().then((data) => setTasks(data));
        getMembers().then((members) => setMembers(members));
    }, []);

    const addTask = (task) => {
        setTasks((prevState) => [...prevState, task]);
    };

    const editTask = (task) => {
        const _tasks = tasks.map((t) => (t.id === task.id ? task : t));
        setTasks(_tasks);
    };

    const removeTask = (id) => {
        const _tasks = tasks.filter((t) => t.id !== id);
        setTasks(_tasks);
    };

    const onTaskSelect = (task) => {
        setSelectedTask(task);
    };

    const markAsCompleted = (task) => {
        const _tasks = tasks.map((t) => (t.id === task.id ? task : t));
        setTasks(_tasks);
    };

    const showDialog = (header, newTask) => {
        setDialogConfig({
            visible: true,
            header: header,
            newTask: newTask
        });
    };

    const closeDialog = () => {
        setDialogConfig((prevState) => ({ ...prevState, visible: false }));
    };

    const value = {
        dialogConfig,
        selectedTask,
        tasks,
        members,
        setTasks,
        setMembers,
        setDialogConfig,
        setSelectedTask,
        getTasks,
        getMembers,
        addTask,
        editTask,
        removeTask,
        onTaskSelect,
        showDialog,
        closeDialog,
        markAsCompleted
    };

    return <TaskContext.Provider value={value}>{props.children}</TaskContext.Provider>;
};
