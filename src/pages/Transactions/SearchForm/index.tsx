import { MagnifyingGlass } from 'phosphor-react'
import { SearchFormContainer } from './styles'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionsContext } from '../../../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'

const searchFormShema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormShema>

export function SeachForm() {
  const fetchTransactions = useContextSelector(TransactionsContext, (context) => {
    return context.fetchTransactions
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    // isSubmitting retorna true or false
    resolver: zodResolver(searchFormShema),
  })

  async function handleSearchTransactions(data: SearchFormInputs) {
    // recebe os valores do campo digitado com a tipagem de string
    await fetchTransactions(data.query)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register('query')} // 'query' voce q escolhe o nome
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  )
}
