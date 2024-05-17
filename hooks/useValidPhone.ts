import { ChangeEvent, useRef } from "react";

const useValidPhone = (input: any) => {
  const firstNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const useFormatRef = useRef<any>(null);

  function getInputNumbersValue(input: any) {
    return input.value.replace(/\D/g, "");
  }

  function onPhonePaste(
    e: (ChangeEvent<HTMLInputElement> & ClipboardEvent) | any,
  ) {
    let input = e.target,
      inputNumbersValue = getInputNumbersValue(input);

    let pasted = e.clipboardData;

    if (pasted) {
      let pastedValue = pasted.getData("Text");

      if (/\D/g.test(pastedValue)) {
        input.value = inputNumbersValue;

        return;
      }
    }
  }

  function onPhoneInput(
    e: (ChangeEvent<HTMLInputElement> & MessageEvent) | any,
  ) {
    let input = e.target,
      inputNumbersValue = getInputNumbersValue(input),
      selectionStart = input.selectionStart,
      formattedInputValue = "";

    if (!inputNumbersValue) {
      return (input.value = "");
    }

    if (input.value.length !== selectionStart) {
      if (e.data && /\D/g.test(e.data)) {
        input.value = inputNumbersValue;
      }

      return;
    }

    if (firstNumbers.indexOf(inputNumbersValue[0]) > -1) {
      let firstSymbols = firstNumbers.includes(inputNumbersValue[0]) && "+7";
      formattedInputValue = input.value = firstSymbols + "";

      if (inputNumbersValue.length > 1) {
        formattedInputValue += "(" + inputNumbersValue.substring(1, 4);
      }

      if (inputNumbersValue.length >= 5) {
        formattedInputValue += ")" + inputNumbersValue.substring(4, 7);
      }

      if (inputNumbersValue.length >= 8) {
        formattedInputValue += "-" + inputNumbersValue.substring(7, 9);
      }

      if (inputNumbersValue.length >= 10) {
        formattedInputValue += "-" + inputNumbersValue.substring(9, 11);
      }
    } else {
      formattedInputValue =
        "+" + inputNumbersValue.substring(0, inputNumbersValue.length);
    }

    input.value = formattedInputValue;
    useFormatRef.current = formattedInputValue;
  }

  function onPhoneKeyDown(
    e: (ChangeEvent<HTMLInputElement> & KeyboardEvent) | any,
  ) {
    let inputValue = e.target.value?.replace(/\D/g, "") as any;

    if (e.keyCode === 8 && inputValue.length === 1) {
      e.target.value = "";
    }
  }

  return {
    input,
    useFormatRef,
    onPhoneInput,
    onPhoneKeyDown,
    onPhonePaste,
  };
};

export default useValidPhone;
