import { Form } from "react-bootstrap";

export const FieldFormSignUp = ({ label, type, placeholder, name, value, onChange, id = "", error = "" }) => {
    return (
        <Form.Group className="mb-3"
            controlId={id}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type={type}
                required
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={e => onChange(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        </Form.Group>
    )
}


export const FieldFormikSignUp = ({ controlId, label, type, placeholder, name, value, onChange, isInvalid, error }) => {
    return (
        <Form.Group className="mb-3" controlId={controlId}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                isInvalid={isInvalid}
            />
            <Form.Control.Feedback type="invalid">
                {error}
            </Form.Control.Feedback>
        </Form.Group>
    )
}