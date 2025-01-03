import { hash, compare } from 'bcryptjs'

// In a real app, you would store hashed passwords in a database
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin'

// Pre-hash the admin password (this would normally be done during user creation)
let hashedAdminPassword: string | null = null

export async function initAuth() {
  if (!hashedAdminPassword) {
    hashedAdminPassword = await hash(ADMIN_PASSWORD, 10)
  }
}

export async function verifyCredentials(username: string, password: string) {
  // Initialize auth if not already done
  await initAuth()

  if (username !== ADMIN_USERNAME) {
    return false
  }

  try {
    return await compare(password, hashedAdminPassword!)
  } catch {
    return false
  }
}

// Call initAuth when the server starts
initAuth() 