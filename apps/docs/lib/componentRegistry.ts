import type { ComponentData } from '../components/playground';

// ========================================
// DatePicker Component Data
// ========================================

export const datePickerData: ComponentData = {
  slug: 'date-picker',
  name: 'DatePicker',
  description: 'A calendar-based date selection component with month/year navigation and keyboard support.',
  category: 'Form',
  categorySlug: 'form',
  variants: [
    {
      id: 'basic',
      label: 'Basic Usage',
      code: `import { useState } from 'react'
import {
  DatePicker,
  DatePickerTrigger,
  DatePickerContent,
  DatePickerHeader,
  DatePickerCalendar,
} from '@r-ui/react-native'

export default function BasicDatePicker() {
  const [date, setDate] = useState<Date | null>(null)

  return (
    <DatePicker value={date} onValueChange={setDate}>
      <DatePickerTrigger placeholder="Select date..." />
      <DatePickerContent>
        <DatePickerHeader />
        <DatePickerCalendar />
      </DatePickerContent>
    </DatePicker>
  )
}`,
    },
    {
      id: 'with-default',
      label: 'With Default Value',
      code: `import { useState } from 'react'
import {
  DatePicker,
  DatePickerTrigger,
  DatePickerContent,
  DatePickerHeader,
  DatePickerCalendar,
} from '@r-ui/react-native'

export default function DatePickerWithDefault() {
  const [date, setDate] = useState<Date | null>(new Date())

  return (
    <DatePicker value={date} onValueChange={setDate}>
      <DatePickerTrigger />
      <DatePickerContent>
        <DatePickerHeader />
        <DatePickerCalendar />
      </DatePickerContent>
    </DatePicker>
  )
}`,
    },
    {
      id: 'with-min-max',
      label: 'With Min/Max Dates',
      code: `import { useState } from 'react'
import {
  DatePicker,
  DatePickerTrigger,
  DatePickerContent,
  DatePickerHeader,
  DatePickerCalendar,
} from '@r-ui/react-native'

export default function DatePickerWithMinMax() {
  const [date, setDate] = useState<Date | null>(null)

  // Only allow dates in the current month
  const today = new Date()
  const minDate = new Date(today.getFullYear(), today.getMonth(), 1)
  const maxDate = new Date(today.getFullYear(), today.getMonth() + 1, 0)

  return (
    <DatePicker
      value={date}
      onValueChange={setDate}
      minDate={minDate}
      maxDate={maxDate}
    >
      <DatePickerTrigger placeholder="Select date this month..." />
      <DatePickerContent>
        <DatePickerHeader />
        <DatePickerCalendar />
      </DatePickerContent>
    </DatePicker>
  )
}`,
    },
    {
      id: 'no-weekends',
      label: 'No Weekends',
      code: `import { useState } from 'react'
import {
  DatePicker,
  DatePickerTrigger,
  DatePickerContent,
  DatePickerHeader,
  DatePickerCalendar,
} from '@r-ui/react-native'

export default function DatePickerNoWeekends() {
  const [date, setDate] = useState<Date | null>(null)

  // Disable weekends
  const disabledDates = (date: Date) => {
    const day = date.getDay()
    return day === 0 || day === 6 // Sunday or Saturday
  }

  return (
    <DatePicker
      value={date}
      onValueChange={setDate}
      disabledDates={disabledDates}
    >
      <DatePickerTrigger placeholder="Select weekday..." />
      <DatePickerContent>
        <DatePickerHeader />
        <DatePickerCalendar />
      </DatePickerContent>
    </DatePicker>
  )
}`,
    },
    {
      id: 'disabled',
      label: 'Disabled',
      code: `import {
  DatePicker,
  DatePickerTrigger,
  DatePickerContent,
  DatePickerHeader,
  DatePickerCalendar,
} from '@r-ui/react-native'

export default function DatePickerDisabled() {
  return (
    <DatePicker disabled value={new Date()}>
      <DatePickerTrigger />
      <DatePickerContent>
        <DatePickerHeader />
        <DatePickerCalendar />
      </DatePickerContent>
    </DatePicker>
  )
}`,
    },
    {
      id: 'custom-format',
      label: 'Custom Format',
      code: `import { useState } from 'react'
import {
  DatePicker,
  DatePickerTrigger,
  DatePickerContent,
  DatePickerHeader,
  DatePickerCalendar,
} from '@r-ui/react-native'

export default function DatePickerCustomFormat() {
  const [date, setDate] = useState<Date | null>(new Date())

  return (
    <DatePicker
      value={date}
      onValueChange={setDate}
      format="dd/MM/yyyy"
    >
      <DatePickerTrigger />
      <DatePickerContent>
        <DatePickerHeader />
        <DatePickerCalendar />
      </DatePickerContent>
    </DatePicker>
  )
}`,
    },
  ],
  installation: 'npx r-ui add date-picker',
  usage: `import { useState } from 'react'
import {
  DatePicker,
  DatePickerTrigger,
  DatePickerContent,
  DatePickerHeader,
  DatePickerCalendar,
} from '@r-ui/react-native'

export default function MyComponent() {
  const [date, setDate] = useState<Date | null>(null)

  return (
    <DatePicker value={date} onValueChange={setDate}>
      <DatePickerTrigger placeholder="Select date..." />
      <DatePickerContent>
        <DatePickerHeader />
        <DatePickerCalendar />
      </DatePickerContent>
    </DatePicker>
  )
}`,
  features: [
    'Month navigation with prev/next buttons',
    'Year/month picker - click the header to switch views',
    'Today indicator with subtle border',
    'Disabled dates with min/max or custom logic',
    'Custom date format support',
    'Full ARIA accessibility support',
    'Keyboard navigation',
  ],
  props: [
    {
      component: 'DatePicker',
      props: [
        { name: 'value', type: 'Date | null', default: '-', description: 'Selected date (controlled)' },
        { name: 'onValueChange', type: '(date: Date | null) => void', default: '-', description: 'Called when date changes' },
        { name: 'defaultValue', type: 'Date | null', default: 'null', description: 'Default date (uncontrolled)' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the picker' },
        { name: 'placeholder', type: 'string', default: '"Select date..."', description: 'Placeholder text' },
        { name: 'format', type: 'string', default: '"MMM d, yyyy"', description: 'Date display format' },
        { name: 'minDate', type: 'Date', default: '-', description: 'Minimum selectable date' },
        { name: 'maxDate', type: 'Date', default: '-', description: 'Maximum selectable date' },
        { name: 'disabledDates', type: '(date: Date) => boolean', default: '-', description: 'Custom disabled date logic' },
        { name: 'open', type: 'boolean', default: '-', description: 'Controlled open state' },
        { name: 'onOpenChange', type: '(open: boolean) => void', default: '-', description: 'Called when open state changes' },
      ],
    },
    {
      component: 'DatePickerTrigger',
      props: [
        { name: 'placeholder', type: 'string', default: '-', description: 'Override placeholder text' },
        { name: 'style', type: 'ViewStyle', default: '-', description: 'Additional styles' },
      ],
    },
  ],
  accessibility: `The DatePicker component follows WAI-ARIA guidelines:

- The trigger button has role="button" and aria-haspopup="dialog"
- The calendar popup has role="dialog" and aria-modal="true"
- Calendar days are navigable with arrow keys
- Today's date is announced to screen readers
- Disabled dates are marked with aria-disabled
- Selected date is marked with aria-selected
- Month/year navigation is keyboard accessible`,
};

// ========================================
// Button Component Data
// ========================================

export const buttonData: ComponentData = {
  slug: 'button',
  name: 'Button',
  description: 'A clickable button component with multiple variants and sizes.',
  category: 'Components',
  categorySlug: 'components',
  variants: [
    {
      id: 'variants',
      label: 'Variants',
      code: `import { Button } from '@r-ui/react-native'

export default function ButtonVariants() {
  return (
    <div className="flex flex-row gap-3 flex-wrap">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  )
}`,
    },
    {
      id: 'sizes',
      label: 'Sizes',
      code: `import { Button } from '@r-ui/react-native'

export default function ButtonSizes() {
  return (
    <div className="flex flex-row items-center gap-3 flex-wrap">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  )
}`,
    },
    {
      id: 'with-icon',
      label: 'With Icon',
      code: `import { Button } from '@r-ui/react-native'

export default function ButtonWithIcon() {
  return (
    <div className="flex flex-row gap-3 flex-wrap">
      <Button>
        <PlusIcon /> Add Item
      </Button>
      <Button variant="outline">
        <DownloadIcon /> Download
      </Button>
    </div>
  )
}`,
    },
    {
      id: 'loading',
      label: 'Loading',
      code: `import { Button } from '@r-ui/react-native'

export default function ButtonLoading() {
  return (
    <div className="flex flex-row gap-3 flex-wrap">
      <Button loading>Loading...</Button>
      <Button loading variant="secondary">
        Processing
      </Button>
    </div>
  )
}`,
    },
    {
      id: 'disabled',
      label: 'Disabled',
      code: `import { Button } from '@r-ui/react-native'

export default function ButtonDisabled() {
  return (
    <div className="flex flex-row gap-3 flex-wrap">
      <Button disabled>Disabled</Button>
      <Button disabled variant="secondary">
        Disabled
      </Button>
    </div>
  )
}`,
    },
  ],
  installation: 'npx r-ui add button',
  usage: `import { Button } from '@r-ui/react-native'

export default function MyComponent() {
  return (
    <Button onPress={() => console.log('Pressed!')}>
      Click me
    </Button>
  )
}`,
  features: [
    'Multiple variants: primary, secondary, outline, ghost, destructive',
    'Three sizes: sm, md, lg',
    'Loading state with spinner',
    'Disabled state',
    'Icon support',
    'Full keyboard accessibility',
  ],
  props: [
    {
      component: 'Button',
      props: [
        { name: 'variant', type: '"primary" | "secondary" | "outline" | "ghost" | "destructive"', default: '"primary"', description: 'Visual style variant' },
        { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Button size' },
        { name: 'loading', type: 'boolean', default: 'false', description: 'Show loading spinner' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the button' },
        { name: 'onPress', type: '() => void', default: '-', description: 'Press handler' },
        { name: 'children', type: 'ReactNode', default: '-', description: 'Button content' },
      ],
    },
  ],
};

// ========================================
// Accordion Component Data
// ========================================

export const accordionData: ComponentData = {
  slug: 'accordion',
  name: 'Accordion',
  description: 'A vertically stacked set of interactive headings that reveal or hide associated content.',
  category: 'Data Display',
  categorySlug: 'data-display',
  variants: [
    {
      id: 'basic',
      label: 'Basic',
      code: `import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@r-ui/react-native'

export default function BasicAccordion() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other components' aesthetic.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}`,
    },
    {
      id: 'multiple',
      label: 'Multiple',
      code: `import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@r-ui/react-native'

export default function MultipleAccordion() {
  return (
    <Accordion type="multiple" defaultValue={['item-1']}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Section 1</AccordionTrigger>
        <AccordionContent>
          Content for section 1.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Section 2</AccordionTrigger>
        <AccordionContent>
          Content for section 2.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Section 3</AccordionTrigger>
        <AccordionContent>
          Content for section 3.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}`,
    },
    {
      id: 'disabled',
      label: 'Disabled Item',
      code: `import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@r-ui/react-native'

export default function DisabledAccordion() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Available</AccordionTrigger>
        <AccordionContent>
          This item is available.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" disabled>
        <AccordionTrigger>Disabled</AccordionTrigger>
        <AccordionContent>
          This item is disabled.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}`,
    },
  ],
  installation: 'npx r-ui add accordion',
  usage: `import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@r-ui/react-native'

export default function MyComponent() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Click to expand</AccordionTrigger>
        <AccordionContent>
          Hidden content revealed on click.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}`,
  features: [
    'Single or multiple items can be expanded',
    'Collapsible mode for single type',
    'Smooth expand/collapse animations',
    'Disabled item support',
    'Controlled or uncontrolled usage',
    'Full keyboard navigation',
  ],
  props: [
    {
      component: 'Accordion',
      props: [
        { name: 'type', type: '"single" | "multiple"', default: '"single"', description: 'Allow one or multiple items open' },
        { name: 'collapsible', type: 'boolean', default: 'false', description: 'Allow closing all items (single type only)' },
        { name: 'value', type: 'string | string[]', default: '-', description: 'Controlled value' },
        { name: 'defaultValue', type: 'string | string[]', default: '-', description: 'Default value (uncontrolled)' },
        { name: 'onValueChange', type: '(value) => void', default: '-', description: 'Called when value changes' },
      ],
    },
    {
      component: 'AccordionItem',
      props: [
        { name: 'value', type: 'string', default: '-', description: 'Unique identifier (required)' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable this item' },
      ],
    },
  ],
};

// ========================================
// Registry Map
// ========================================

export const componentRegistry: Record<string, ComponentData> = {
  'date-picker': datePickerData,
  'button': buttonData,
  'accordion': accordionData,
};

// ========================================
// Helper Functions
// ========================================

export function getComponentData(slug: string): ComponentData | undefined {
  return componentRegistry[slug];
}

export function getAllComponentSlugs(): string[] {
  return Object.keys(componentRegistry);
}
