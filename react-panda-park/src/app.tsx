import { styled } from 'styled-system/jsx'

import { AccordionDemo } from 'src/components/accordion'
import { AlertDemo } from 'src/components/alerts'
import { CardDemo } from 'src/components/card'
import InputDemo from 'src/components/inputs'
import { DatePickerDemo } from 'src/components/date-picker'

export default function App() {
  return (
    <styled.div m='4'>
      {/* <CardDemo /> */}
      {/* <AccordionDemo my='4' /> */}
      {/* <InputDemo /> */}
      {/* <AlertDemo /> */}
      <DatePickerDemo />
    </styled.div>
  )
}
