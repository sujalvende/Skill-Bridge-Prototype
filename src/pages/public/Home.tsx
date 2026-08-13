import Hero from '../../components/Hero'
import StatsStrip from '../../components/StatsStrip'
import HowItWorks from '../../components/HowItWorks'
import SkillPassport from '../../components/SkillPassport'
import WhyTeach from '../../components/WhyTeach'
import CreditEconomy from '../../components/CreditEconomy'
import WhyLearn from '../../components/WhyLearn'
import PeopleSection from '../../components/PeopleSection'
import CallToAction from '../../components/CallToAction'

export default function Home() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <HowItWorks />
      <SkillPassport />
      <WhyTeach />
      <CreditEconomy />
      <WhyLearn />
      <PeopleSection />
      <CallToAction />
    </>
  )
}
