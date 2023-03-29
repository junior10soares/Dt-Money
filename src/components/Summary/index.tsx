import { SummaryContainer, SummerCard } from './styles'
import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react'
import { priceFormater } from '../../utils/formater'
import { useSummary } from '../../hooks/useSummary'

export function Summary() {

  const summary = useSummary()

  return (
    <SummaryContainer>
      <SummerCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#00b37e" />
        </header>
        <strong>{priceFormater.format(summary.income)}</strong>
      </SummerCard>

      <SummerCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color="#f75a68" />
        </header>
        <strong>{priceFormater.format(summary.outcome)}</strong>
      </SummerCard>

      <SummerCard variant="green">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color="#fff" />
        </header>
        <strong>{priceFormater.format(summary.total)}</strong>
      </SummerCard>
    </SummaryContainer>
  )
}
