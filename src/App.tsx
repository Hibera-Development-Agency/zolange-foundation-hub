import {Toaster} from "@/components/ui/toaster";
import {Toaster as Sonner} from "@/components/ui/sonner";
import {TooltipProvider} from "@/components/ui/tooltip";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Team from "./pages/Team";
import Volunteer from "./pages/Volunteer";
import Contact from "./pages/Contact";
import Donate from "./pages/Donate";
import Dashboard from "./pages/DashboardNew";
import UserManagement from "./pages/UserManagement";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import {ScrollToTop} from "@/components/ScrollToTop.tsx";
import {LanguageProvider} from "@/contexts/LanguageContext";


const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <LanguageProvider>
                <Toaster/>
                <Sonner/>
                <BrowserRouter>
                    <ScrollToTop/>
                    <Routes>
                        <Route path="/" element={<Index/>}/>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/projects" element={<Projects/>}/>
                        <Route path="/projects/:slug" element={<ProjectDetail/>}/>
                        <Route path="/team" element={<Team/>}/>
                        <Route path="/volunteer" element={<Volunteer/>}/>
                        <Route path="/contact" element={<Contact/>}/>
                        <Route path="/donate" element={<Donate/>}/>
                        <Route path="/auth" element={<Auth/>}/>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                        <Route path="/users" element={<UserManagement/>}/>
                        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </BrowserRouter>
            </LanguageProvider>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;
