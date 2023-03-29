import { useContextSelector } from 'use-context-selector'
import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { priceFormater } from '../../utils/formater'
import { SeachForm } from './SearchForm'
import {
  PriceHightlight,
  TransactionsContainer,
  TransactionsTable,
} from './styles'

export function Transactions() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

  return (
    <div>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SeachForm />

        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <PriceHightlight variant={transaction.type}>
                      {transaction.type === 'outcome' && '- '}
                      {priceFormater.format(transaction.price)}
                    </PriceHightlight>
                  </td>
                  <td>{transaction.category}</td>

                  <td>{transaction.createAt}</td>
                </tr>
              )
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}
