'use client'

import { CalendarIcon } from 'lucide-react'
import * as React from 'react'

import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { formatDate } from '@/lib/format-date'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  date: Date | undefined
  onChangeDate: (date: Date | undefined) => void
  container?: HTMLElement | null
}

export function DatePickerInput({ date, onChangeDate, container }: Props) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id="date-picker"
          variant="outline"
          aria-label="Select date"
          className={cn(
            'justify-start items-center w-fit',
            !date && 'text-muted-foreground',
          )}
        >
          <CalendarIcon />
          <span>{date ? formatDate(date) : 'Fecha'}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        container={container}
        className="w-auto overflow-hidden p-0"
        align="center"
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
  )
}
