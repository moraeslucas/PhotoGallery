#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:3.1 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443
RUN curl -sL https://deb.nodesource.com/setup_14.x |  bash -
RUN apt-get install -y nodejs

FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build
RUN curl -sL https://deb.nodesource.com/setup_14.x |  bash -
RUN apt-get install -y nodejs
WORKDIR /src
COPY ["PhotoGallery/PhotoGallery.csproj", "PhotoGallery/"]
RUN dotnet restore "PhotoGallery/PhotoGallery.csproj"
COPY . .
WORKDIR "/src/PhotoGallery"
RUN dotnet build "PhotoGallery.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "PhotoGallery.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "PhotoGallery.dll"]