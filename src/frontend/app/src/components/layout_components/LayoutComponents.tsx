import React from 'react';
import './styles.css';

type PageContainerProps = {
    children: React.ReactNode
};

type CustomWrapperProps = {
    children: React.ReactNode
};

type FormInputLineProps = {
    inputLabel: string,
    variableName: string,
    onChange: () => void,
    value: string,
    type?: string
};

export const PageContainer = (props: PageContainerProps) => {
    return (
        <div className="container-login">
            {props.children}
        </div>
    )
}

export const CustomWrapper = (props: CustomWrapperProps) => {
    return (
        <div className="wrap-login">
            {props.children}
        </div>
    )
}

export const FormInputLine = (props: FormInputLineProps) => {

    return (
        <div className="wrap-input">
            <input
            maxLength={16}
            className={props.value !== "" ? "has-val input" : "input"}
            name={props.variableName}
            type={props.type ? props.type : "text"}
            value={props.value}
            onChange={props.onChange}
            data-testid={props.variableName}
            />
            <span className="focus-input" data-placeholder={props.inputLabel}/>
        </div>
    )
}