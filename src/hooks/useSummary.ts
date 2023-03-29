import { useContextSelector } from "use-context-selector"
import { TransactionsContext } from "../contexts/TransactionsContext"

export const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
})

export function useSummary() {

    const summary = transactions.reduce(
        (acc, transactions) => {
            if (transactions.type === 'income') {
                acc.income += transactions.price
                acc.total += transactions.price
            } else {
                acc.outcome -= transactions.price
                acc.total -= transactions.price
            }
            return acc
        },
        {
            income: 0,
            outcome: 0,
            total: 0,
        },
    )
    return summary
}