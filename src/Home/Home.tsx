import { Cards } from '../Card/Card';
import { Product, produtos } from '../Produtos';
import styles from './Home.module.css'
import { GiShoppingCart } from "react-icons/gi";

import logo from './Imagem_do_WhatsApp_de_2024-01-26_à_s__16.59.29_c5e8e7da-removebg-preview.png'
import { RxHamburgerMenu } from 'react-icons/rx';
import { useEffect, useState } from 'react';

export function Home() {
    const [carrinho, setCarrinho] = useState<Product[]>([])
    const [endereco, setEndereco] = useState('')
    const [total, setTotal] = useState<number | undefined>(0)

    function enviarCarrinhoParaWhatsApp() {
        let mensagem = `${endereco}\nPedido:\n`;
        
        carrinho.forEach((item, index) => {
            mensagem += `${index + 1}. ${item.nome} - Preço: $${item?.preco}\n`;
        });
        
        mensagem += total
        
       
        const mensagemCodificada = encodeURIComponent(mensagem);
    
       
        const whatsappUrl = `https://wa.me/997226672?text=${mensagemCodificada}`;
    
      
        window.open(whatsappUrl, '_blank');
    }
    
    function adicionar(pedido: Product) {
        setCarrinho([...carrinho, pedido])
    }

    function remover(indexRemove: any) {
        setCarrinho(carrinhoAtual => carrinhoAtual.filter((_, index) => index !== indexRemove));
    }
    
    function totalPreco() {
        let final = 0
        carrinho.forEach(item => {
            final += item?.preco
            setTotal(final)
        });
    }

    useEffect(() => {
        totalPreco();
    },[carrinho])


    return (
        <>
            <main className={styles.main}>
                <header>
                   <img src={logo} alt="" className={styles.logo}/>
                    {/* <div>redes</div> */}
                    <RxHamburgerMenu color='white' size={30}/>
                </header>
                <div className={styles.body}>
                    {
                        produtos.map((p) => {
                            return (
                            <>
                            
                            <Cards   produto={p}  nome={p.nome} preco={p.preco} descricao={p.descricao} categoria={p.categoria} adicionar={adicionar} />
                            
                            </>
                            )
                        })
                    }
                </div>
                <input type="text" onChange={(e) => setEndereco(e.target.value)}/>
                <div>
                    {carrinho.map((c, index) => {
                        return (
                            <>
                            <p>{index} - {c.nome} - R${c.preco},00</p>
                            <button onClick={() => remover(index)}>remover</button>
                            </>
                        )
                    })}
                    <p>Total - R${total},00</p>
                </div>
                <footer>
                    <div className={styles.carrinho}>
                        <GiShoppingCart  size={60} /> Seu Pedido
                    </div>
                    <div>
                        <button>3 itens</button>
                        <button onClick={() => enviarCarrinhoParaWhatsApp()}>enviar </button>
                    </div>
                </footer>
            </main>
        </>
    )
}