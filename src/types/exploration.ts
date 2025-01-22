export interface RoleExploration {
  id: string;
  userId: string;
  explorationType: 'guided' | 'custom';
  roleTitle: string;
  requiresEducation: boolean;
  academicYear?: string;
  subjects?: string[];
  predictedGrades?: Record<string, string>;
  country?: string;
  createdAt: Date;
}

export interface CourseRecommendation {
  id: string;
  explorationId: string;
  providerName: string;
  courseTitle: string;
  courseUrl: string;
  isHigherEducation: boolean;
  createdAt: Date;
}

export interface SavedExploration {
  roleTitle: string;
  courses: {
    provider: string;
    title: string;
    url: string;
  }[];
  requiresEducation: boolean;
}