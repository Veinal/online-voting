import React from 'react'

export default function Vote() {
  return (
    <div>

        <div className="flex flex-col min-h-screen">
        <header className="bg-primary text-primary-foreground py-4 px-6">
            <h1 className="text-3xl font-bold">Online Voting</h1>
        </header>
        <main className="flex-1 py-8 px-4 md:px-8 lg:px-12">
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-lg shadow-md">
                <div className="flex items-center gap-4">
                <img
                    src="/placeholder.svg"
                    alt="Candidate 1"
                    width="80"
                    height="80"
                    className="rounded-full"
                    style={{aspectRatio: '80 / 80', objectFit: 'cover'}}
                />
                <div>
                    <h2 className="text-xl font-bold">Candidate 1</h2>
                    <p className="text-muted-foreground">Platform: Improve education</p>
                </div>
                </div>
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 mt-4 w-full">
                Vote
                </button>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md">
                <div className="flex items-center gap-4">
                <img
                    src="/placeholder.svg"
                    alt="Candidate 2"
                    width="80"
                    height="80"
                    className="rounded-full"
                    style={{aspectRatio: '80 / 80', objectFit: 'cover'}}
                />
                <div>
                    <h2 className="text-xl font-bold">Candidate 2</h2>
                    <p className="text-muted-foreground">Platform: Improve healthcare</p>
                </div>
                </div>
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 mt-4 w-full">
                Vote
                </button>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md">
                <div className="flex items-center gap-4">
                <img
                    src="/placeholder.svg"
                    alt="Candidate 3"
                    width="80"
                    height="80"
                    className="rounded-full"
                    style={{aspectRatio: '80 / 80', objectFit: 'cover'}}
                />
                <div>
                    <h2 className="text-xl font-bold">Candidate 3</h2>
                    <p className="text-muted-foreground">Platform: Improve infrastructure</p>
                </div>
                </div>
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 mt-4 w-full">
                Vote
                </button>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md">
                <div className="flex items-center gap-4">
                <img
                    src="/placeholder.svg"
                    alt="Candidate 4"
                    width="80"
                    height="80"
                    className="rounded-full"
                    style={{aspectRatio: '80 / 80', objectFit: 'cover'}}
                />
                <div>
                    <h2 className="text-xl font-bold">Candidate 4</h2>
                    <p className="text-muted-foreground">Platform: Improve economy</p>
                </div>
                </div>
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 mt-4 w-full">
                Vote
                </button>
            </div>
            </section>
            <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Vote Tallies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-card p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold">Candidate 1</h3>
                <p className="text-4xl font-bold">0</p>
                </div>
                <div className="bg-card p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold">Candidate 2</h3>
                <p className="text-4xl font-bold">0</p>
                </div>
                <div className="bg-card p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold">Candidate 3</h3>
                <p className="text-4xl font-bold">0</p>
                </div>
                <div className="bg-card p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold">Candidate 4</h3>
                <p className="text-4xl font-bold">0</p>
                </div>
            </div>
            </section>
        </main>
        <footer className="bg-muted text-muted-foreground py-4 px-6 text-center">
            <p>© 2024 Online Voting. All rights reserved.</p>
        </footer>
        </div>
    </div>
  )
}
