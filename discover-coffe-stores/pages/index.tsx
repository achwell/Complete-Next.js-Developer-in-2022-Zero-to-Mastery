import type {GetStaticProps, NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Banner from "../components/banner"
import Card from "../components/card"
import ICoffeeStorePresentation from "../types/ICoffeeStorePresentation"
import { fetchCoffeeStores } from "../lib/coffee-stores"
import styles from '../styles/Home.module.css'

interface Props {
  coffeeStores: ICoffeeStorePresentation[]
}

const Home: NextPage<Props> = ({coffeeStores}) => {

  const handleOnBannerBtnClick = () => {
    console.log("click")
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Coffee Connoisseur</h1>
        <Banner buttonText="View stores nearby" handleOnClick={handleOnBannerBtnClick}/>
        <div className={styles.heroImage}>
          <Image src="/static/hero-image.png" width={700} height={400}/>
        </div>
        {coffeeStores.length > 0 && (
            <>
              <h2 className={styles.heading2}>Toronto stores</h2>
              <div className={styles.cardLayout}>
                {coffeeStores.map((coffeeStore) => {
                  return (
                      <Card
                          key={coffeeStore.id}
                          name={coffeeStore.name}
                          imgUrl={
                              coffeeStore.imgUrl ||
                              "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                          }
                          href={`/coffee-store/${coffeeStore.id}`}
                          className={styles.card}
                      />
                  );
                })}
              </div>
            </>
        )}
      </main>

    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async (context) => {
  const coffeeStores = await fetchCoffeeStores()
  return {
    props: {
      coffeeStores
    }, // will be passed to the page component as props
  };
}