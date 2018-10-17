<template>
    <div class="upimg">

    </div>
</template>
<script>
export default {
	name: "uploadImg",
    props: {
		width: {
			type: String,
            default: "100%"
        },
        height: {
			type: String,
            default: ""
        },
        action: {
			type: String
        },

    }
}
</script>

<style lang="less" scoped>
    .upimg{
        width: 100%;
    }
</style>