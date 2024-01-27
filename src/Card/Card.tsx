// import { Card } from "@card/components/ui/card";
import { Card } from "@/components/ui/card";
import { Product } from "../Produtos";
import styles from './Card.module.css'


export function Cards({ nome, preco, descricao, categoria, adicionar, produto}: any){
    return (
        <>
            <Card>
               
                <h1>{nome}</h1>
                <p>Valor: {preco},00</p>
                <p>{descricao}</p>
                <p>{categoria}</p>
                <button onClick={() => adicionar(produto)}>
                    add
                </button>
            </Card>
        </>
    )
}