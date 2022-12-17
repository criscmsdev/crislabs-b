import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { connectionFromArraySlice } from 'graphql-relay';
import { CreateArticle, UpdateArticle } from 'src/common/dto/article.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { Article, ListArticle } from 'src/common/entities/article.model';
import ConnectionArgs, {
  getPagingParameters,
} from 'src/common/pagination/relay/connection.args';
import { MarketingArticlesService } from './marketing-articles.service';

@Resolver(() => Article)
export class MarketingArticlesResolver {
  constructor(private readonly articlesService: MarketingArticlesService) {}

  @Mutation(() => Article, { name: 'marketingCreateArticle' })
  create(@Args('inputCreate') inputCreate: CreateArticle) {
    const data = this.articlesService.create(inputCreate);
    return data;
  }

  @Mutation(() => Article, { name: 'marketingUpdateArticle' })
  update(@Args('inputUpdate') inputUpdate: UpdateArticle) {
    return this.articlesService.update(inputUpdate);
  }

  @Mutation(() => Article, { name: 'marketingUpdateImageArticle' })
  updateImage(@Args('inputImage') inputImage: UpdateImage) {
    return this.articlesService.updateImage(inputImage);
  }

  @Mutation(() => String, { name: 'marketingDeleteArticle' })
  delete(@Args('id') id: string) {
    return this.articlesService.deleteArticle(id);
  }

  @Mutation(() => [String], { name: 'marketingDeleteArticles' })
  deleteArticlesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    return this.articlesService.deleteArticlesById(ids);
  }

  @Mutation(() => String, { name: 'marketingDeleteAllArticles' })
  deleteAllArticles() {
    return this.articlesService.deleteAllArticles();
  }

  @Query(() => Article, { name: 'marketingGetArticle' })
  getArticle(@Args('id') id: string) {
    return this.articlesService.getArticle(id);
  }
  @Query(() => Article, { name: 'marketingGetArticleBySlug' })
  getArticleBySlug(@Args('siteId') siteId: string, @Args('slug') slug: string) {
    return this.articlesService.getArticleBySlug(siteId, slug);
  }

  @Query(() => [Article], { name: 'marketingGetArticles' })
  getArticles() {
    return this.articlesService.getArticles();
  }

  @Query(() => [Article], { name: 'marketingGetArticlesByParentId' })
  getArticlesByParentId(@Args('parentId') parentId: string) {
    return this.articlesService.getArticlesByParentId(parentId);
  }
  @Query(() => [Article], { name: 'marketingGetArticlesBySiteId' })
  getArticlesBySiteId(@Args('siteId') siteId: string) {
    return this.articlesService.getArticlesBySiteId(siteId);
  }

  @Query(() => ListArticle, { name: 'marketingGetArticlesWithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListArticle> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.articlesService.all(
      {
        limit,
        offset,
      },
      parentId,
    );
    const page = connectionFromArraySlice(data, args, {
      arrayLength: count,
      sliceStart: offset || 0,
    });

    return { page, pageData: { count, limit, offset } };
  }
}
