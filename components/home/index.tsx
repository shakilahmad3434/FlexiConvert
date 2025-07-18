import Hero from './Hero'
import Features from './Features'
import Formats from './Formats'
import { FileUploadZone } from '../shared/FileUploadZone'

const Home = () => {
  return (
    <div>
        <Hero />
        <FileUploadZone />
        <Formats />
        <Features />
    </div>
  )
}

export default Home