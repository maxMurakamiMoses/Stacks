import { Header } from '@/components/leaderboards/Header'
import { LeaderboardFeed } from '@/components/leaderboards/LeaderboardFeed'
import SearchBar from '@/components/SearchBar'
import React from 'react'

const page = () => {
  return (
    <>
        <Header />
        <LeaderboardFeed />
    </>
  )
}

export default page