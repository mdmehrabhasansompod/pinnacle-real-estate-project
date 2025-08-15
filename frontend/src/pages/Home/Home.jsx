import React from 'react'
import Header from "../../components/Header/Header"
import FreaturedProject from '../../components/FeaturedProject/FreaturedProject'
import ExploreService from '../../components/Explore Service/ExploreService'
import { ClientsReview } from '../../components/ClientsReview/ClientsReview'
import LatestNews from '../../components/LatestNews/LatestNews'
import FAQ from '../../components/FAQ/FAQ'
import LetsBuild from '../../components/Letsbuild/Letsbuild'
import Flyer from '../../components/Flyer/Flyer'


const Home = () => {
  return (
    <>
    <Header/>
    <Flyer/>
    <FreaturedProject/>
    <ExploreService/>
    <ClientsReview/>
    <LatestNews/>
    <FAQ/>
    <LetsBuild/>
    </>
  )
}

export default Home