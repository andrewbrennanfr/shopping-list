<script setup lang="ts">
import Filters from "@/components/Filters.vue"
import List from "@/components/List.vue"
import Navbar from "@/components/Navbar.vue"
import Recipes from "@/components/Recipes.vue"
import { useRecipesStore } from "@/store/recipes"
import localforage from "localforage"
import { computed, onBeforeMount, ref, watch } from "vue"

/* -------------------------------------------------------------------------- */

const url = ref<string | null>(null)

const recipesStore = useRecipesStore()

onBeforeMount(async () => {
    const cachedUrl = await localforage.getItem<string>("url")

    url.value = cachedUrl
})

const handleClickRefresh = async () => {
    const cachedUrl = url.value

    url.value = null
    selectedCategories.value = []
    keywords.value = ""
    selectedRecipes.value = []

    await localforage.removeItem("table")

    url.value = cachedUrl
}

const handleClickSetup = async () => {
    const promptUrl = prompt("What is the url from the document?")

    if (promptUrl) await localforage.setItem<string>("url", promptUrl)

    url.value = promptUrl
}

watch(url, (newUrl) => {
    if (newUrl) recipesStore.fetch(newUrl)
})

/* -------------------------------------------------------------------------- */

const removeEmoji = (value: string): string => value.replace(/\p{Emoji}/gu, "")

const categories = computed(() => [
    ...new Set(
        recipesStore.data
            ?.map(({ categories }) => categories)
            .flat()
            .sort((categoryA, categoryB) =>
                removeEmoji(categoryA).localeCompare(removeEmoji(categoryB))
            ) ?? []
    ),
])

const selectedCategories = ref<string[]>([])

const handleSelectCategory = (e: Event) => {
    const target = e.target

    if (target instanceof HTMLSelectElement)
        selectedCategories.value = Array.from(target.selectedOptions).map(
            ({ value }) => value
        )
}

const handleClickClear = () => {
    selectedCategories.value = []
    keywords.value = ""
}

/* -------------------------------------------------------------------------- */

const keywords = ref("")

const handleChangeKeywords = (e: Event) => {
    const target = e.target

    if (target instanceof HTMLInputElement) keywords.value = target.value
}

/* -------------------------------------------------------------------------- */

const selectedRecipes = ref<string[]>([])

const recipes = computed(
    () =>
        recipesStore.data
            ?.map(({ name }) => name)
            .sort((recipeA, recipeB) =>
                removeEmoji(recipeA).localeCompare(removeEmoji(recipeB))
            ) ?? []
)

const filteredRecipes = computed(
    () =>
        recipesStore.data
            ?.map(({ name }) => name)
            .filter((recipe) => {
                const fullRecipe = recipesStore.data?.find(
                    ({ name }) => name === recipe
                )

                const hasCategory = selectedCategories.value.length
                    ? selectedCategories.value.some((category) =>
                          fullRecipe?.categories.includes(category)
                      )
                    : true

                const hasKeywords = keywords.value.trim()
                    ? recipe
                          .toLowerCase()
                          .includes(keywords.value.trim().toLowerCase()) ||
                      fullRecipe?.ingredients
                          .map(({ name }) => name.toLowerCase())
                          .some((name) =>
                              name.includes(keywords.value.trim().toLowerCase())
                          )
                    : true

                return hasCategory && hasKeywords
            })
            .sort((recipeA, recipeB) =>
                removeEmoji(recipeA).localeCompare(removeEmoji(recipeB))
            ) ?? []
)

const handleSelectRecipe = (e: Event) => {
    const target = e.target

    if (target instanceof HTMLSelectElement)
        selectedRecipes.value = Array.from(target.selectedOptions).map(
            ({ value }) => value
        )
}

/* -------------------------------------------------------------------------- */

const ingredientsList = computed(() => {
    const selectedIngredients =
        recipesStore.data
            ?.filter(({ name }) => selectedRecipes.value.includes(name))
            .map(({ ingredients }) => ingredients)
            .flat() ?? []

    const names = [
        ...new Set(
            selectedIngredients
                .map(({ name }) => name)
                .sort((ingredientA, ingredientB) =>
                    removeEmoji(ingredientA).localeCompare(
                        removeEmoji(ingredientB)
                    )
                )
        ),
    ]

    return names.map((name) => {
        const matchingIngredients = selectedIngredients.filter(
            (ingredient) => ingredient.name === name
        )

        const ingredientsByUnit = matchingIngredients.reduce(
            (acc, ingredient) => {
                const existingIngredient = acc.find(
                    ({ unit }) => unit === ingredient.unit
                )

                if (existingIngredient) {
                    existingIngredient.amount += ingredient.amount
                } else {
                    acc.push({ ...ingredient })
                }

                return acc
            },
            [] as typeof matchingIngredients
        )

        const amount = ingredientsByUnit
            .map(({ amount, unit }) => `${amount} ${unit}`)
            .join(" + ")

        return { amount, name }
    })
})
</script>

<template>
    <div>
        <Navbar
            :onClickRefresh="handleClickRefresh"
            :onClickSetup="handleClickSetup"
            :url="url"
        />

        <Filters
            v-if="categories.length"
            :categories="categories"
            :keywords="keywords"
            :onClickClear="handleClickClear"
            :onChangeKeywords="handleChangeKeywords"
            :onSelectCategory="handleSelectCategory"
            :selectedCategories="selectedCategories"
        />

        <Recipes
            v-if="categories.length"
            :onSelectRecipe="handleSelectRecipe"
            :recipes="recipes"
            :filteredRecipes="filteredRecipes"
            :selectedRecipes="selectedRecipes"
        />

        <List
            v-if="ingredientsList.length"
            :ingredientsList="ingredientsList"
        />
    </div>
</template>
