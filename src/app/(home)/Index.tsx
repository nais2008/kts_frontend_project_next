"use client"

import React from "react"

import { useRouter } from "next/navigation"

import { ROUTES } from "@/config/routes.config"

import Button from "@/components/ui/Button"

const Index: React.FC = () => {
  const router = useRouter()

  return (
    <Button onClick={() => router.push(ROUTES.repositories())}>
      Go to Repo
    </Button>
  )
}

export default Index
