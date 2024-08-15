import routes from "./routes/index"
import { Route, Routes } from "react-router"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { WhatsAppWidget } from "react-whatsapp-widget"
import "react-whatsapp-widget/dist/index.css"

function App() {
  return (
    <>
      <Header />
      <Routes>
        {routes.map(({ path, component: Component }) => {
          return <Route key={path} path={path} element={<Component />} />
        })}
      </Routes>
      <WhatsAppWidget phoneNumber="+923145866627" />

      <Footer />
    </>
  )
}

export default App
