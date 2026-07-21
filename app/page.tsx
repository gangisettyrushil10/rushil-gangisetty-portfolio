import { AboutObservatory } from '@/components/observatory/about-observatory'
import { CapabilityBands } from '@/components/observatory/capability-bands'
import { ContactTransmission } from '@/components/observatory/contact-transmission'
import { FlightPath } from '@/components/observatory/flight-path'
import { OffDutyLab } from '@/components/observatory/off-duty-lab'
import { PlanetaryHero } from '@/components/observatory/planetary-hero'
import { ProjectArchive } from '@/components/observatory/project-archive'
import { SiteFooter } from '@/components/observatory/site-footer'
import { TechnicalSystems } from '@/components/observatory/technical-systems'
import { featuredProjectIds } from '@/lib/portfolio-content'
import { personalInfo, projects } from '@/lib/data'

const siteUrl = 'https://rushil-gangisetty-portfolio.vercel.app'

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: personalInfo.name,
  url: siteUrl,
  email: `mailto:${personalInfo.email}`,
  jobTitle: 'Software Engineer',
  homeLocation: { '@type': 'Place', name: personalInfo.location },
  sameAs: [personalInfo.github, personalInfo.linkedin],
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Austin College',
  },
}

const projectSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Selected software projects by Rushil Gangisetty',
  itemListElement: featuredProjectIds.map((id, index) => {
    const project = projects.find((entry) => entry.id === id)
    return {
      '@type': 'ListItem',
      position: index + 1,
      url: `${siteUrl}/projects/${id}`,
      name: project?.title ?? id,
    }
  }),
}

export default function HomePage() {
  return (
    <main id="main-content" className="observatory-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema).replace(/</g, '\\u003c') }} />
      <PlanetaryHero />
      <ProjectArchive />
      <TechnicalSystems />
      <CapabilityBands />
      <AboutObservatory />
      <FlightPath />
      <OffDutyLab />
      <ContactTransmission />
      <SiteFooter />
    </main>
  )
}
