import type { ResumeRepository } from '#/types/repository.type'

export async function migrateLocalToRemote(
  local: ResumeRepository,
  remote: ResumeRepository,
): Promise<void> {
  const localResumes = await local.listResumes()
  if (localResumes.length === 0) return

  for (const metadata of localResumes) {
    const resume = await local.getResume(metadata.id)
    if (!resume) continue

    const remoteId = await remote.createResume({
      title: resume.title,
      template_id: resume.template_id,
    })
    await remote.updateResumeData(remoteId, resume.data)
  }

  for (const metadata of localResumes) {
    await local.deleteResume(metadata.id)
  }
}
