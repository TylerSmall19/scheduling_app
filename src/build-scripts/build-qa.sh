echo "API KEY LOOKUP: "
echo $API_LOOKUP_KEY

echo "API KEY: "
echo ${!API_LOOKUP_KEY}

export API_LOOKUP_KEY="SCHEDULE_API_KEY_QA"

./build-base.sh