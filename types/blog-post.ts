interface Author {
  name: string;
  role: string;
  avatar: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  publishDate: Date;
  category: string[];
  tags: string[];
  aiGenerated: boolean;
  author: Author;
}

