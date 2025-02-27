function IndexPage() {
  const [tutorialsWithDates, tutorialsWithoutDates] = useTutorialsData()

  // Move tutorials with no date to the end of the list
  const tutorials = [...tutorialsWithDates, ...tutorialsWithoutDates]

  // TODO: replace these runtime calculations with detailed YAML version once we're compiling these lists at build time

  // Create a sorted list of all unique formats
  const formatArrays = tutorials.map(tutorial => tutorial.node.formats)
  const formats = [
    ...new Set(
      formatArrays
        .reduce((acc, curr) => [...acc, ...curr]) // merge arrays into one
        .map(format => format.toLowerCase()) // convert all formats to lowercase
    )
  ].sort();

  // Create a sorted list of all unique topics
  const topicArrays = tutorials.map(tutorial => tutorial.node.topics)
  const topics = [
    ...new Set(
      topicArrays
        .reduce((acc, curr) => [...acc, ...curr]) // merge arrays into one
        .map(topic => topic.toLowerCase()) // convert all topics to lowercase
    )
  ].sort()

  // Create a sorted list of all unique authors
  const authorArrays = tutorials.map(tutorial => tutorial.node.authors)
  const authors = [
    ...new Set(
      authorArrays.reduce((acc, curr) => [...acc, ...curr]) // merge arrays
    )
  ].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())) // ignore case

  // Create a sorted list of all unique sources
  const sources = [
    ...new Set(
      tutorials.map(tutorial => (tutorial.node.source ? tutorial.node.source : ''))
    )
  ].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())) // ignore case

  return (
    <Base>
      <Main>
        <Directory
          tutorials={tutorials}
          formats={formats}
          topics={topics}
          authors={authors}
          sources={sources}
        />
      </Main>
    </Base>
  )
}

///////////////////////////////////////////////////////////////////////////////////

const Main = styled.main`
  background-color: var(--near-white);
  min-height: 75vh;
  font-family: var(--bodyFont);
`

///////////////////////////////////////////////////////////////////////////////////

import React from 'react'
import styled from 'styled-components'

import Base from '../components/Base'
import Directory from '../components/Directory'
import useTutorialsData from '../queries/useTutorialsData'

export default IndexPage
