export type RIASECType =
  | 'realistic'
  | 'investigative'
  | 'artistic'
  | 'social'
  | 'enterprising'
  | 'conventional'

export type RIASECScores = Record<RIASECType, number>

export interface QuestionOption {
  value: number
  label: string
}

export interface Question {
  id: number
  type: RIASECType
  text: string
  options: QuestionOption[]
}

export interface Profession {
  id: string
  name: string
  description: string
  icon: string
  riasecMatch: RIASECType[]
  gameAvailable: boolean
}

export interface AIRecommendation {
  professionId: string
  matchPercent: number
  explanation: string
  personalNote: string
}

export interface AIAnalysisResult {
  recommendations: AIRecommendation[]
  strengths: string[]
  growthAreas: string[]
}

export interface TestState {
  userName: string
  userAge: number
  answers: Record<number, number>
  riasecScores: RIASECScores
  aiResult?: AIAnalysisResult
}
