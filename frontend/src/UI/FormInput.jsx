import { FloatingLabel, Form } from "react-bootstrap";

// export default function FormInput({
//     controlId,
//     label,
//     type = "text",
//     name,
//     value,
//     onChange,
//     isInvalid,
//     error,
//     options,
//     as,
//     rows,
//     disabled = false,
//     required = false,
//     placeholder = " ",
//     className,
// }) {
//     return (
//         <Form.Group>
//             <FloatingLabel controlId={controlId} label={label}>
//                 {as === "select" ? (
//                     <Form.Select
//                         name={name}
//                         value={value}
//                         onChange={onChange}
//                         isInvalid={isInvalid}
//                     >
//                         {(options || []).map((option) => (
//                             <option key={option.value} value={option.value}>
//                                 {option.label}
//                             </option>
//                         ))}
//                     </Form.Select>
//                 ) : (
//                     <Form.Control
//                         as={as}
//                         rows={rows}
//                         type={type}
//                         name={name}
//                         value={value}
//                         onChange={onChange}
//                         isInvalid={isInvalid}
//                         placeholder={placeholder}
//                     />
//                 )}
//                 <Form.Control.Feedback type="invalid">
//                     {error}
//                 </Form.Control.Feedback>
//             </FloatingLabel>
//         </Form.Group>
//     );
// }

export default function FormInput({
    controlId,
    label,
    type = "text",
    name,
    value,
    onChange,
    isInvalid,
    error,
    options = [],
    as,
    disabled = false,
    required = false,
    placeholder = " ",
    className,
    min,
}) {
    return (
        <Form.Group controlId={controlId} className={className}>
            <FloatingLabel label={label} className="mb-3">
                {as === "select" ? (
                    <Form.Select
                        name={name}
                        value={value}
                        onChange={onChange}
                        isInvalid={isInvalid}
                        disabled={disabled}
                        required={required}
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </Form.Select>
                ) : (
                    <Form.Control
                        as={as}
                        type={type}
                        name={name}
                        value={value}
                        onChange={onChange}
                        isInvalid={isInvalid}
                        placeholder={placeholder}
                        disabled={disabled}
                        required={required}
                        min={min}
                    />
                )}
                <Form.Control.Feedback type="invalid">
                    {error}
                </Form.Control.Feedback>
            </FloatingLabel>
        </Form.Group>
    );
}
