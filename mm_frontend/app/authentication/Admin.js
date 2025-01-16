'use client'
import Link from "next/link";
import Users from "./Users";

export const Admin = () => {
    return (
        <section>
            <h1>Admins Page</h1>
            <br />
            <Users />
            <br />
            <div className="flexGrow">
                <Link href="/">Home</Link>
            </div>
        </section>
    )
}