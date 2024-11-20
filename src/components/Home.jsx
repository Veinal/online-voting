import React, { useEffect, useState } from 'react'
import VotingImg from '../votingImg.svg'
import phone_sec from '../phone_sec.jpg'
import auth from '../authenticate.jpeg'
import castVote from '../cast-vote.jpg'
import results from '../results.jpg'
import Footer from './Footer'
import {Link} from 'react-router-dom'

export default function Home(props) {

    const [user,setUser]=useState('')

    useEffect(()=>{
        let user1=JSON.parse(localStorage.getItem("UserToken"))
        setUser(user1)
        console.log(user1,'user1')
    },[props.logoutCount])
    
    console.log(user,'user')

  return (
    <div>
        <div className="flex flex-col min-h-[100dvh]">
        
        <main className="flex-1">
            <section className="w-full py-12 md:py-20 lg:py-28 xl:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                <div className="flex flex-col justify-center space-y-4">
                    <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                        Secure and Accessible Online Voting
                    </h1>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                        Our online voting system ensures secure authentication, real-time results, and accessibility for all
                        voters.
                    </p>
                    </div>
                    <div>
                    {user ? 
                    <Link to='/vote'>
                        <a
                            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-gray-700 hover:text-white"
                            href="#"
                            rel="ugc"
                        >
                            Vote now
                        </a>
                    </Link>
                    :
                    <Link to='/signin'>
                        <a
                            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-gray-700 hover:text-white"
                            href="#"
                            rel="ugc"
                        >
                            Sign Up
                        </a>
                    </Link>
                    }
                    </div>
                </div>
                <img
                    src={VotingImg}
                    alt="Hero"
                    className="w-full max-w-[500px] mx-auto rounded-xl object-cover object-center lg:order-last"
                />

                </div>
            </div>
            </section>
            <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                    <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Secure, Accessible, and Transparent</h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Our online voting system is designed to provide a secure, accessible, and transparent experience for
                    all voters.
                    </p>
                </div>
                </div>
                <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                <div className="flex flex-col justify-center space-y-4">
                    <ul className="grid gap-6">
                    <li>
                        <div className="grid gap-1">
                        <h3 className="text-xl font-bold">Secure Authentication</h3>
                        <p className="text-muted-foreground">
                            Our advanced authentication system ensures only eligible voters can access the platform.
                        </p>
                        </div>
                    </li>
                    <li>
                        <div className="grid gap-1">
                        <h3 className="text-xl font-bold">Real-Time Results</h3>
                        <p className="text-muted-foreground">
                            Voters can track the progress of the election in real-time, providing transparency and
                            accountability.
                        </p>
                        </div>
                    </li>
                    <li>
                        <div className="grid gap-1">
                        <h3 className="text-xl font-bold">Accessible Design</h3>
                        <p className="text-muted-foreground">
                            Our platform is designed to be accessible for all voters, including those with disabilities.
                        </p>
                        </div>
                    </li>
                    </ul>
                </div>
                <img
                    src={phone_sec}
                    width="550"
                    height="310"
                    alt="Features"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-first"
                />
                </div>
            </div>
            </section>
            <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                    <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Testimonials</div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Users Say</h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Hear from our satisfied users about their experience with our secure online voting system.
                    </p>
                </div>
                </div>
                <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                <div className="flex flex-col justify-center space-y-4">
                    <div className="rounded-lg bg-background p-6 shadow">
                    <blockquote>
                        <p className="text-muted-foreground">
                        "The secure authentication and real-time results made the voting process seamless and
                        transparent."
                        </p>
                        <cite className="mt-4 block text-sm font-medium leading-none">- Jane Doe, Voter</cite>
                    </blockquote>
                    </div>
                    <div className="rounded-lg bg-background p-6 shadow">
                    <blockquote>
                        <p className="text-muted-foreground">
                        "As a voter with a disability, I was impressed by the accessibility features of the platform. It
                        made my voice heard."
                        </p>
                        <cite className="mt-4 block text-sm font-medium leading-none">- John Smith, Voter</cite>
                    </blockquote>
                    </div>
                </div>
                <div className="flex flex-col justify-center space-y-4">
                    <div className="rounded-lg bg-background p-6 shadow">
                    <blockquote>
                        <p className="text-muted-foreground">
                        "The online voting system was easy to use and provided a secure way for me to participate in the
                        election."
                        </p>
                        <cite className="mt-4 block text-sm font-medium leading-none">- Sarah Lee, Voter</cite>
                    </blockquote>
                    </div>
                    <div className="rounded-lg bg-background p-6 shadow">
                    <blockquote>
                        <p className="text-muted-foreground">
                        "I was impressed by the transparency of the results and the ease of tracking the progress of the
                        election."
                        </p>
                        <cite className="mt-4 block text-sm font-medium leading-none">- Michael Chen, Voter</cite>
                    </blockquote>
                    </div>
                </div>
                </div>
            </div>
            </section>
            <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                    <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Our Process</div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How It Works</h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Experience a simple, secure, and transparent online voting process in just a few steps.
                    </p>
                </div>
                </div>
                <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="bg-primary p-6 rounded-full">
                    <img src={auth} alt="Authentication" className="w-40 h-36 rounded-xl" />
                    </div>
                    <h3 className="text-xl font-bold">1. Authenticate</h3>
                    <p className="text-muted-foreground">
                    Use secure login credentials to access the voting platform, ensuring only eligible voters can participate.
                    </p>
                </div>
                
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="bg-primary p-6 rounded-full">
                    <img src={castVote} alt="Vote" className="w-40 h-36 rounded-xl" />
                    </div>
                    <h3 className="text-xl font-bold">2. Cast Your Vote</h3>
                    <p className="text-muted-foreground">
                    Select your preferred candidate and submit your vote with confidence in a secure environment.
                    </p>
                </div>

                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="bg-primary p-6 rounded-full">
                    <img src={results} alt="Results" className="w-40 h-36 rounded-xl" />
                    </div>
                    <h3 className="text-xl font-bold">3. View Results</h3>
                    <p className="text-muted-foreground">
                    Check the results in real-time as votes are tallied transparently, ensuring accountability and trust.
                    </p>
                </div>
                </div>
            </div>
            </section>

        </main>

        <Footer/>

        </div>
    </div>
  )
}
