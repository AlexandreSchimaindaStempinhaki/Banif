import React, { useState, useRef, useEffect } from "react";
import { InputContainer, EditableDiv } from "./style";

export default function InputSeguro({
  value,
  onChange,
  placeholder,
  name,
  type = "text",
  required,
  pattern,
  style,
}) {
  const divRef = useRef();
  const [internalValue, setInternalValue] = useState(value || "");

  // Sincroniza com value externo
  useEffect(() => {
    if (value !== internalValue && divRef.current) {
      divRef.current.textContent = value || "";
      setInternalValue(value || "");
    }
  }, [value, internalValue]);

  // Atualiza quando conteúdo muda
  useEffect(() => {
    const handleInput = () => {
      const newValue = divRef.current.textContent || "";
      setInternalValue(newValue);

      if (onChange) {
        const syntheticEvent = {
          target: {
            name: name,
            value: newValue,
            type: type,
          },
        };
        onChange(syntheticEvent);
      }
    };

    const div = divRef.current;
    div.addEventListener("input", handleInput);

    return () => div.removeEventListener("input", handleInput);
  }, [onChange, name, type]);

  return (
    <InputContainer style={style}>
      <EditableDiv
        ref={divRef}
        contentEditable
        placeholder={placeholder}
        suppressContentEditableWarning={true}
        style={{
          ...style,
          backgroundColor: style?.backgroundColor || "#f8f9fa",
          color: style?.color || "#000000",
        }}
      />
    </InputContainer>
  );
}
