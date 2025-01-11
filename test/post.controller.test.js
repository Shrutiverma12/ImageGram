import { getAllPosts, deletePost } from '../src/controllers/postController.js';
import {
  deletePostervice,
  getAllPostsService,
} from '../src/services/postService.js';
import { mockRequest, mockResponse } from './mocker.js';
import postService from '../src/services/postService.js';
import { when } from 'jest-when';

const paginatedPosts = [
  {
    caption: 'This is a sample post',
    image: 'https://www.sample.com/sample.jpg',
    user: 'sample_user_id',
  },
  {
    caption: 'This is a sample post',
    image: 'https://www.sample.com/sample.jpg',
    user: 'sample_user_id',
  },
];
jest.mock('../src/services/postService.js', () => {
  return {
    getAllPostsService: jest.fn(),
    deletePostervice: jest.fn(),
  };
});

test('getAllPosts should return all posts', async () => {
  const req = mockRequest();
  const res = mockResponse();
  postService.getAllPostsService.mockResolvedValue(paginatedPosts);
  await getAllPosts(req, res);

  expect(res.status).toHaveBeenCalledWith(200);

  expect(res.json).toHaveBeenCalledWith({
    success: true,
    message: 'All posts fetched successfully',
    data: paginatedPosts,
  });
});

test('getAllPosts should return all poasts', async () => {
  const req = mockRequest();
  const res = mockResponse();

  const errorMessage = 'Service error';

  postService.getAllPostsService.mockRejectedValue(new Error(errorMessage));

  await getAllPosts(req, res);
  expect(res.json).toHaveBeenCalledWith({
    success: false,
    message: 'Internal Server Error',
  });
});

test('deletePost should delete a post', async () => {
  const req = mockRequest();
  const res = mockResponse();

  req.params.id = 'sample_post_id';
  req.user = {
    _id: 'sample_user_id',
  };
  postService.deletePostervice.mockResolvedValue(true);

  await deletePost(req, res);

  expect(res.status).toHaveBeenCalledWith(200);

  expect(res.json).toHaveBeenCalledWith({
    success: true,
    message: 'Post Deleted successfully',
    data: true,
  });
});

test('deletePost should handle post not found', async () => {
  const req = mockRequest();
  const res = mockResponse();

  req.params.id = 'sample_post_id';
  req.user = {
    _id: 'sample_user_id',
  };

  when(postService.deletePostervice)
    .calledWith('sample_post_id', 'sample_user_id')
    .mockResolvedValue(false);

  await deletePost(req, res);

  expect(res.status).toHaveBeenCalledWith(404);

  expect(res.json).toHaveBeenCalledWith({
    success: false,
    message: 'Post not found',
  });
});

test('deletePost should handle service exception', async () => {
  const req = mockRequest();
  const res = mockResponse();

  req.params.id = 'sample_post_id';
  req.user = {
    _id: 'sample_user_id',
  };

  when(postService.deletePostervice)
    .calledWith('sample_post_id', 'sample_user_id')
    .mockRejectedValue(new Error('Internal Server Error '));

  await deletePost(req, res);

  expect(res.status).toHaveBeenCalledWith(500);

  expect(res.json).toHaveBeenCalledWith({
    success: false,
    message: 'Internal Server Error ',
  });
});

test('deletePost should handle service exception with custom error', async () => {
  const req = mockRequest();
  const res = mockResponse();

  req.params.id = 'sample_post_id';
  req.user = {
    _id: 'sample_user_id',
  };

  when(postService.deletePostervice)
    .calledWith('sample_post_id', 'sample_user_id')
    .mockRejectedValue({
      status: 400,
      message: 'Custom Error',
    });

  await deletePost(req, res);

  expect(res.status).toHaveBeenCalledWith(400);

  expect(res.json).toHaveBeenCalledWith({
    success: false,
    message: 'Custom Error',
  });
});
