import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BlogPost } from '../types/database';
import { blogService } from '../services/blogService';
import { toast } from '@/hooks/use-toast';

interface BlogContextType {
  blogPosts: BlogPost[];
  addBlogPost: (post: Omit<BlogPost, 'id'>) => Promise<void>;
  editBlogPost: (post: BlogPost) => Promise<void>;
  deleteBlogPost: (id: string) => Promise<void>;
  getBlogPost: (slug: string) => BlogPost | undefined;
  refreshBlogPosts: () => Promise<void>;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const useBlogContext = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlogContext must be used within a BlogProvider');
  }
  return context;
};

interface BlogProviderProps {
  children: ReactNode;
}

export const BlogProvider = ({ children }: BlogProviderProps) => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => blogService.getLocalCache());

  useEffect(() => {
    const unsubscribe = blogService.subscribe((posts) => {
      setBlogPosts(posts);
    });

    return () => unsubscribe();
  }, []);

  const refreshBlogPosts = async () => {
    setBlogPosts(blogService.getLocalCache());
  };

  const addBlogPost = async (post: Omit<BlogPost, 'id'>) => {
    try {
      const created = await blogService.add(post);
      toast({
        title: "New Post Published",
        description: `"${created.title}" is now live.`,
      });
    } catch (error) {
      console.error('Failed to add blog post:', error);
      toast({
        title: "Error",
        description: "Could not save blog post. Please try again.",
        variant: "destructive"
      });
    }
  };

  const editBlogPost = async (updatedPost: BlogPost) => {
    try {
      await blogService.update(updatedPost);
      toast({
        title: "Post Updated",
        description: `"${updatedPost.title}" was updated.`,
      });
    } catch (error) {
      console.error('Failed to update blog post:', error);
      toast({
        title: "Error",
        description: "Could not update post.",
        variant: "destructive"
      });
    }
  };

  const deleteBlogPost = async (id: string) => {
    try {
      await blogService.delete(id);
      toast({
        title: "Post Deleted",
        description: "The post was successfully removed.",
      });
    } catch (error) {
      console.error('Failed to delete post:', error);
      toast({
        title: "Error",
        description: "Could not delete post.",
        variant: "destructive"
      });
    }
  };

  const getBlogPost = (slug: string) => {
    return blogPosts.find((post) => post.slug === slug);
  };

  return (
    <BlogContext.Provider
      value={{ 
        blogPosts, 
        addBlogPost, 
        editBlogPost, 
        deleteBlogPost, 
        getBlogPost,
        refreshBlogPosts 
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
