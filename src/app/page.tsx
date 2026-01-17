import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Programs from "@/components/Programs";
import Advantages from "@/components/Advantages";
import BlogSection from "@/components/BlogSection";
import PublicMessages from "@/components/PublicMessages";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { getPublicMessages } from "@/app/actions/contact";

export const dynamic = "force-dynamic";

export default async function Home() {
    const publicMessages = await getPublicMessages();

    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <Hero />
            <Programs />
            <Advantages />
            <BlogSection />
            <PublicMessages messages={publicMessages} />
            <ContactForm />
            <Footer />
        </main>
    );
}
