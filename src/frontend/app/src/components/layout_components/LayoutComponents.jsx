import './styles.css';

export const PageContainer = (props) => {
    return (
        <div className="container-login">
            {props.children}
        </div>
    )
}

export const CustomWrapper = (props) => {
    return (
        <div className="wrap-login">
            {props.children}
        </div>
    )
}

export const FormInputLine = (props) => {

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