import { Button, type ButtonProps } from 'lib/components/button'
import { styled } from 'styled-system/jsx'

import type { CardProps } from 'lib/components/card'
import * as Card from 'lib/components/card'
import { FormLabel } from 'lib/components/form-label'
import { Input } from 'lib/components/input'
import { Stack } from 'styled-system/jsx'

import { Checkbox, type CheckboxProps } from 'lib/components/checkbox'

const CheckboxDemo = (props: CheckboxProps) => (
  <Checkbox defaultChecked {...props}>
    Label
  </Checkbox>
)

const CardDemo = (props: CardProps) => {
  return (
    <Card.Root width='sm' {...props}>
      <Card.Header>
        <Card.Title>Team Members</Card.Title>
        <Card.Description>Add new members to your organisation.</Card.Description>
      </Card.Header>
      <Card.Body>
        <Stack gap='4'>
          <Stack gap='1.5'>
            <FormLabel htmlFor='name'>Name</FormLabel>
            <Input id='name' placeholder='Name' />
          </Stack>
          <Stack gap='1.5'>
            <FormLabel htmlFor='email'>Email</FormLabel>
            <Input id='email' type='email' placeholder='Email' />
          </Stack>
        </Stack>
      </Card.Body>
      <Card.Footer gap='3'>
        <Button variant='subtle'>Cancel</Button>
        <Button>Invite</Button>
      </Card.Footer>
    </Card.Root>
  )
}

import type { AccordionProps } from 'lib/components/accordion'
import * as Accordion from 'lib/components/accordion'
import { LuChevronDown } from 'react-icons/lu'

export const AccordionDemo = (props: AccordionProps) => {
  const items = ['React', 'Solid', 'Svelte', 'Vue']
  return (
    <Accordion.Root defaultValue={['React']} multiple {...props}>
      {items.map((item, id) => (
        <Accordion.Item key={id} value={item} disabled={item === 'Svelte'}>
          <Accordion.ItemTrigger>
            {item}
            <Accordion.ItemIndicator>
              <LuChevronDown />
            </Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <div>
              Pudding donut gummies chupa chups oat cake marzipan biscuit tart. Dessert
              macaroon ice cream bonbon jelly. Jelly topping tiramisu halvah lollipop.
            </div>
          </Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}

export default function App() {
  return (
    <styled.div m='4'>
      <Button>Button</Button>
      <CardDemo my='4' />
      <CheckboxDemo my='4' />
      <AccordionDemo my='4' />
    </styled.div>
  )
}
