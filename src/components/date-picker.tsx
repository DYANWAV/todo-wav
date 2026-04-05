'use client'

import { CalendarIcon } from 'lucide-react'
import * as React from 'react'

import { Calendar } from '@/components/ui/calendar'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { formatDate } from '@/lib/format-date'

interface Props {
  value: string
  onChangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void
  date: Date | undefined
  onChangeDate: (date: Date | undefined) => void
}

export function DatePickerInput({
  value,
  onChangeValue,
  date,
  onChangeDate,
}: Props) {
  const [open, setOpen] = React.useState(false)
  // const [date, setDate] = React.useState<Date | undefined>()
  // const [month, setMonth] = React.useState<Date | undefined>(date)
  // const [value, setValue] = React.useState(formatDate(date))

  return (
    <InputGroup className="w-40">
      <InputGroupInput
        id="date-required"
        value={value}
        placeholder={formatDate(new Date())}
        onChange={onChangeValue}
      />
      <InputGroupAddon align="inline-end">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <InputGroupButton
              id="date-picker"
              variant="ghost"
              size="icon-xs"
              aria-label="Select date"
            >
              <CalendarIcon />
              <span className="sr-only">Select date</span>
            </InputGroupButton>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={date}
              onSelect={date => {
                onChangeDate(date)
                console.log({
                  dateFromDatePicker: date,
                  typeof: typeof date,
                })
                setOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>
      </InputGroupAddon>
    </InputGroup>
  )
}
