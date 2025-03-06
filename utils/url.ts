import { Href } from "expo-router";

type DefaultParams = Record<string, string>;

export function parseUrl<
  Q extends DefaultParams = DefaultParams,
  T extends Href = Href
>(path: T, obj: Q): T {
  const searchParams = new URLSearchParams(obj);
  const url = `${path.toString()}?${searchParams.toString()}`;

  return url as T;
}
