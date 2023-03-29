import { ReactNode, useEffect, useState, useCallback } from 'react'
import { createContext } from 'use-context-selector'
import { api } from '../lib/axios'

interface Transaction {
    id: number
    description: string
    type: 'income' | 'outcome'
    price: number
    category: string
    createAt: string
}

interface CreateTransactionInput {
    description: string
    price: number
    category: string
    type: 'income' | 'outcome'
}

interface TransactionsContextType {
    transactions: Transaction[]
    fetchTransactions: (data?: string) => Promise<void> // assincrona por isso passa promise
    createTransaction: (data: CreateTransactionInput) => Promise<void>
}

interface TransactionsProviderProps {
    children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionsContextType)//createContext que vem de dentro from 'use-context-selector'

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([])

    const fetchTransactions = useCallback(async (query?: string) => {
        // recebe uma string de busca

        const response = await api.get('/transactions', {
            // api
            params: {//exibe tudo
                _sort: 'createdAt', // colocar em ordem as datas
                _order: 'desc', // ordem decresc
                q: query,
            },
        })

        setTransactions(response.data)
    }, [])

    const createTransaction = useCallback(async (data: CreateTransactionInput) => {//callback evite que a mesma seja recriada quando n tem necessidade de criaçao da msma
        const { description, price, category, type } = data
        // exibir isso tudo
        const response = await api.post('/transactions', {
            // post é para add outro no server.json e o mesmo ja vem com id e colocar essas inf
            description,
            price,
            category,
            type,
            createdAt: new Date(),
        })
        setTransactions((state) => [response.data, ...state]) // mais recente, dps carrega o resto colocar em ordem
    }, [])

    useEffect(() => {
        fetchTransactions()
    }, [])

    return (
        <TransactionsContext.Provider
            value={{
                transactions,
                fetchTransactions,
                createTransaction,
            }}
        >
            {children}
        </TransactionsContext.Provider>
    )
}
