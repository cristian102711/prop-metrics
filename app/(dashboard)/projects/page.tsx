import { prisma } from '@/lib/prisma'
import ClientProjectList from './ClientProjectList'

export default async function ProjectsPage() {
  // Fetch projects from the database
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'asc' }
  })

  return <ClientProjectList projects={projects} />
}
