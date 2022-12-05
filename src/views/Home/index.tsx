import HeroSection from "./components/HeroSection"
import OverallSection from "./components/OverallSection"
import RecentlySection from "./components/RecentlySection"
import WeeklySection from "./components/WeeklySection"

const HomePage = () => {
    return (
        <>
            <HeroSection />
            <WeeklySection />
            <OverallSection />
            <RecentlySection />
        </>
    )
}

export default HomePage