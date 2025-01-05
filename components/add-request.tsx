"use client";

import {createKpi} from '@/lib/actions';
import {zodResolver} from "@hookform/resolvers/zod";
import {BoxIcon,Plus,X} from "lucide-react";
import {useFieldArray,useForm} from "react-hook-form";
import * as z from "zod";
import {Button} from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {Input} from "./ui/input";
import {Textarea} from "./ui/textarea";

const formSchema=z.object({
  title: z.string().min(1,"Title is required"),
  description: z.string().min(1,"Description is required"),
  tags: z.string().min(1,"Tags are required"),
  questions: z.array(
    z.object({
      question: z.string().min(1,"Question is required"),
    })
  ),
});

type FormValues=z.infer<typeof formSchema>;

export default function AddRequest() {
  const form=useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      tags: "",
      questions: [{question: ""}],
    },
  });

  const {fields,append,remove}=useFieldArray({
    control: form.control,
    name: "questions",
  });

  const onSubmit=async (data: FormValues) => {
    console.log(data);
    const kpiData={
      kpi: {
        title: data.title,
        description: data.description,
      },
      tags: data.tags.split(','),
      questions: data.questions.map(q => q.question),
    };
    await createKpi(kpiData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          title="Request"
          className="absolute top-0 right-2 transform -translate-y-6 bg-slate-500 hover:bg-slate-500/90"
        >
          <BoxIcon />
          <span className="sm:block hidden">Request</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New KPI</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="KPI Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="KPI Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Tags (comma separated)</FormLabel>
                  <FormControl>
                    <Input placeholder="tag1,tag2,tag3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <FormLabel>Questions</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({question: ""})}
                >
                  <Plus className="h-4 w-4" />
                  Add Question
                </Button>
              </div>

              {fields.map((field,index) => (
                <FormField
                  key={field.id}
                  control={form.control}
                  name={`questions.${index}.question`}
                  render={({field}) => (
                    <FormItem>
                      <div className="flex items-center gap-2">
                        <FormControl>
                          <Input placeholder="Enter question" {...field} />
                        </FormControl>
                        {index>0&&(
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => remove(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>

            <Button type="submit" className="w-full">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
