import './styles.css'
import Button from '../Button'
import { useState } from 'react'
import Display from '../Display'


export default function Calculator(){

    const [displayValue, setDisplayValue] = useState<string>('0')
    const [clearDisplay, setclearDisplay] = useState<boolean>(false)
    const [currentOperation, setCurrentOperation] = useState<string>('')
    const [values, setValues] = useState<number[]>([0, 0])
    const [current, setCurrent] = useState<number>(0)


    function clearMemory() {
        setDisplayValue('0')
        setclearDisplay(false)
        setCurrentOperation('')
        setValues([0, 0])
        setCurrent(0)
    }

    function setOperation(op: string) {
        if (current === 0) {
            setclearDisplay(true)
            setCurrent(1)
            setCurrentOperation(op)
        } else {
            const equals = op === "="
            const tmp = [...values]
            tmp[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            tmp[1] = 0
            setDisplayValue(String(tmp[0]))
            setCurrentOperation(equals ? '' : op)
            setCurrent(equals ? 0 : 1)
            setclearDisplay(!equals)
            setValues(tmp)
        }
    }   

    function addDigit(n: any) {
        if(n === '.' && displayValue.includes('.')) return;
        
        const clearedDisplay = displayValue === '0' || clearDisplay;
        const valueCurrent = clearedDisplay ? '' : displayValue
        const newValue = String(valueCurrent) + String(n)
        setDisplayValue(newValue)
        setclearDisplay(false)

        if( n !== '.') {
            const i = current;
            const newValues = [...values]
            newValues[i] = parseFloat(newValue)
            setValues(newValues)
        }
    }

    return (
        <div className='calculator'>
            <Display value={displayValue}/>
            <Button label="AC" triple click={() => clearMemory()}/>
            <Button label="/" click={(op) => setOperation(op)} operation/>
            <Button label="7" click={(n) => addDigit(n)}/>
            <Button label="8" click={(n) => addDigit(n)}/>
            <Button label="9" click={(n) => addDigit(n)}/>
            <Button label="*" click={(op) => setOperation(op)} operation/>
            <Button label="4" click={(n) => addDigit(n)}/>
            <Button label="5" click={(n) => addDigit(n)}/>
            <Button label="6" click={(n) => addDigit(n)}/>
            <Button label="-" click={(op) => setOperation(op)} operation/>
            <Button label="1" click={(n) => addDigit(n)}/>
            <Button label="2" click={(n) => addDigit(n)}/>
            <Button label="3" click={(n) => addDigit(n)}/>
            <Button label="+" click={(op) => setOperation(op)} operation/>
            <Button label="0" double click={(n) => addDigit(n)}/>
            <Button label="." click={(n) => addDigit(n)}/>
            <Button label="=" click={(n) => setOperation(n)} operation/>
        </div>
    )
}