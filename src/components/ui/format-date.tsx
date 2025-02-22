import { formatDate } from "@/lib/utils"

interface FormattedDateProps {
  date: string | Date
  className?: string
}

export function FormattedDate({ date, className }: FormattedDateProps) {
  return (
    <time dateTime={new Date(date).toISOString()} className={className}>
      {formatDate(date)}
    </time>
  )
}