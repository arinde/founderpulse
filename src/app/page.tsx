"use client"
import Link from "next/link"
import { Tabs,TabsList,TabsTrigger,TabsContent } from "@/components/ui/animated-tabs";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {

  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Loading state

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // reset error

    // ✅ Simulate loading effect
    setLoading(true);

    setTimeout(() => {
      if (username === "admin" && password === "admin") {
        localStorage.setItem("isLoggedIn", "true");
        router.push("/dashboard");
      } else {
        setError("Invalid username or password");
        setLoading(false);
      }
    }, 1200); // delay for effect
  };

  return(
    <>
        <Tabs defaultValue="profile" className="w-[10px]">
            <TabsList>
              <TabsTrigger value="profile">Login</TabsTrigger>
              <TabsTrigger value="settings">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <form
                  onSubmit={handleLogin}
                  className=""
                >

                  {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

                  <input
          type="text"
          placeholder="Username"
          className="border w-full p-2 mb-3 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
        />

        <input
          type="password"
          placeholder="Password"
          className="border w-full p-2 mb-4 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
                </form>
              </div>
            </TabsContent>
            <TabsContent value="settings">Look at your settings here.</TabsContent>
        </Tabs>
    </>
  )
}